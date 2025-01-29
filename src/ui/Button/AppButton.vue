<script setup lang="ts">
export type BtnStyleType =
  | "filled"
  | "elevated"
  | "tonal"
  | "outlined"
  | "text";

type Props = {
  styleType: BtnStyleType;
  disabled?: boolean;
  onClick?: () => void;
};

const { styleType, disabled } = defineProps<Props>();
</script>

<template>
  <button
    class="flex gap-2 justify-center items-center text-label-lg py-2.5 px-6 rounded-full outline-hidden"
    :class="{
      'text-on-primary bg-primary shadow-elevation-2 active:shadow-elevation-1':
        styleType === 'filled',
      'text-primary bg-primary-container shadow-elevation-2 active:shadow-elevation-1':
        styleType === 'tonal',
      'bg-surface-container-low shadow-elevation-1 text-primary active:bg-primary active:text-on-primary':
        styleType === 'elevated',
      'border border-outline bg-inherit text-primary active:backdrop-brightness':
        styleType === 'outlined',
      'bg-inherit text-primary': styleType === 'text',
      'disabled:text-on-background-op-38 disabled:bg-on-background-op-12 disabled:shadow-none active:disabled:shadow-none active:disabled:bg-on-background-op-12 cursor-not-allowed':
        disabled,
    }"
    @click="onClick"
    :disabled
  >
    <slot>Нажми</slot>
  </button>
</template>
