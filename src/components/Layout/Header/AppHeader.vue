<script setup lang="ts">
import { useAppRoute } from "@/composables/useAppRoute";
import AppButton from "@/ui/Button/AppButton.vue";
import { HomeIcon, NumberedListIcon } from "@heroicons/vue/24/outline";

const { isHome, isList } = useAppRoute();
</script>

<template>
  <header
    class="flex justify-center items-center py-1 border-b border-gray-100 bg-primary-fixed-dim text-primary px-4"
  >
    <nav class="flex bg-surface-container-low rounded-full">
      <RouterLink :to="{ name: 'home' }">
        <AppButton :style-type="isHome() ? 'tonal' : 'text'">
          <HomeIcon class="size-5" />
          <span>Домашняя</span>
        </AppButton>
      </RouterLink>
      <RouterLink :to="{ name: 'list' }">
        <AppButton :style-type="isList() ? 'tonal' : 'text'">
          <NumberedListIcon class="size-5" />
          <span> Список </span>
        </AppButton>
      </RouterLink>
    </nav>
  </header>
</template>
