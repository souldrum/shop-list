<script setup lang="ts">
import type { Product } from "@/types/product.types";
import AppListItem from "../ListItem/AppListItem.vue";

type Props = {
  products: Product[];
};

const { products } = defineProps<Props>();
</script>

<template>
  <ul class="flex flex-col gap-2">
    <TransitionGroup name="listItem">
      <AppListItem
        v-for="(product, index) of products"
        :product
        :index
        :key="product.id"
      />
    </TransitionGroup>
  </ul>
</template>

<style scoped>
.listItem-enter-active,
.listItem-leave-active {
  transition: opacity 0.4s ease;
}

.listItem-enter-from,
.listItem-leave-to {
  opacity: 0;
}
</style>
