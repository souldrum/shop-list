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
    <AppListItem
      v-for="(product, index) of products"
      :product
      :index
      :key="product.id"
    />
  </ul>
</template>
