<script setup lang="ts">
import { useProducts } from "@/composables/useProducts";
import type { Product } from "@/types/product.types";
import {
  CheckIcon,
  MinusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";
import { VueSpinnerDots } from "vue3-spinners";

type Props = {
  product: Product;
  index: number;
};

const { useUpdateProduct, useDeleteProduct } = useProducts();

const { product, index } = defineProps<Props>();

const isDone = ref(product.done);
const isCanceled = ref(product.canceled);
const loading = ref(false);

const isEdit = ref(false);
const editValue = ref("");

const onEdit = (value: string) => {
  editValue.value = value;
  isEdit.value = !isEdit.value;
};

const onBlur = async (id: string) => {
  if (!editValue.value.trim()) {
    isEdit.value = false;
    return;
  }

  loading.value = true;
  await useUpdateProduct(id, { ...product, title: editValue.value });
  loading.value = false;

  isEdit.value = false;
};

const onDone = async (id: string) => {
  isDone.value = !isDone.value;
  isCanceled.value = false;

  await useUpdateProduct(id, {
    ...product,
    done: isDone.value,
    canceled: isCanceled.value,
  });
};

const onCancel = async (id: string) => {
  isCanceled.value = !isCanceled.value;
  isDone.value = false;

  await useUpdateProduct(id, {
    ...product,
    done: isDone.value,
    canceled: isCanceled.value,
  });
};

const onDelete = async (id: string) => {
  if (!confirm("Удалить?")) return;

  await useDeleteProduct(id);
};
</script>

<template>
  <li
    class="flex justify-between max-w-full p-4 gap-2 items-center rounded-xl shadow-elevation-1 bg-surface-container-low text-on-surface-variant"
    :class="{
      'bg-done!': isDone,
      'bg-error-container!': isCanceled,
    }"
  >
    <div v-if="isEdit" class="flex items-center gap-2 mr-auto">
      <input
        class="bg-inherit outline-hidden border-b border-outline p-1"
        :class="{ 'animate-pulse! border-none!': loading }"
        v-model="editValue"
        @blur="onBlur(product.id)"
        @keyup.enter="onBlur(product.id)"
      />

      <VueSpinnerDots class="text-4xl text-primary" v-if="loading" />
      <CheckIcon
        v-else
        class="size-6 text-secondary cursor-pointer"
        @click="onBlur(product.id)"
      />
    </div>

    <span v-else class="mr-auto">{{ index + 1 }}. {{ product.title }}</span>
    <div v-if="!isEdit" class="flex gap-3">
      <PencilIcon
        class="size-6 cursor-pointer"
        @click="onEdit(product.title)"
      />
      <CheckIcon
        class="size-6 text-green-500 cursor-pointer"
        @click="onDone(product.id)"
      />
      <MinusCircleIcon
        class="size-6 text-error cursor-pointer"
        @click="onCancel(product.id)"
      />
      <TrashIcon class="size-5 cursor-pointer" @click="onDelete(product.id)" />
    </div>
  </li>
</template>
