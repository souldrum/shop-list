<script setup lang="ts">
import type { Product } from "@/types/product.types";
import draggable from "vuedraggable";
import AppListItem from "../ListItem/AppListItem.vue";
import { ref } from "vue";

type Props = {
  products: Product[];
};

type DraggableOptions = {
  animation?: number;
  group?: string;
  disabled?: boolean;
  ghostClass?: string;
};

const options = ref<DraggableOptions>({
  // animation: 200,
  // group: "description",
  // disabled: false,
  // ghostClass: "ghost",
});

const { products } = defineProps<Props>();
</script>

<template>
  <draggable
    tag="ul"
    :list="products"
    class="flex flex-col gap-2"
    item-key="id"
    v-bind="options"
  >
    <template #item="{ element: product, index }">
      <AppListItem :product :index :key="product.id" />
    </template>
  </draggable>
</template>
