<script setup lang="ts">
import { useDeleteProduct } from "@/composables/useProducts";
import { PRODUCTS } from "@/products/Products";
import { useSetStorageData } from "@/storage/useLocalStorage";
import type { Product } from "@/types/product.types";
import {
  CheckIcon,
  MinusCircleIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";

type Props = {
  products: Product[];
};

const { products } = defineProps<Props>();

const isDone = ref(false);
const isCanceled = ref(false);

const onDone = (id: string) => {
  const targetProduct = products.find((p) => p.id === id);

  if (targetProduct) {
    isDone.value = !isDone.value;
    isCanceled.value = false;

    targetProduct.done = isDone.value;
    targetProduct.canceled = isCanceled.value;
  }

  useSetStorageData(PRODUCTS, products);
};

const onCancel = (id: string) => {
  const targetProduct = products.find((p) => p.id === id);

  if (targetProduct) {
    isCanceled.value = !isCanceled.value;
    isDone.value = false;

    targetProduct.canceled = isCanceled.value;
    targetProduct.done = isDone.value;
  }

  useSetStorageData(PRODUCTS, products);
};

const onDelete = (id: string) => {
  if (!confirm("Удалить?")) return;

  useDeleteProduct(id);
};
</script>

<template>
  <ul class="flex flex-col gap-2">
    <li
      class="flex justify-between p-2 gap-2 items-center border border-gray-200 rounded"
      :class="{ 'bg-green-100': product.done, 'bg-red-200': product.canceled }"
      v-for="(product, index) of products"
      :key="product.id"
    >
      <span class="mr-auto">{{ index + 1 }}. {{ product.title }}</span>
      <CheckIcon
        class="size-4 text-green-500 cursor-pointer"
        @click="onDone(product.id)"
      />
      <MinusCircleIcon
        class="size-4 text-red-500 cursor-pointer"
        @click="onCancel(product.id)"
      />
      <TrashIcon class="size-4 cursor-pointer" @click="onDelete(product.id)" />
    </li>
  </ul>
</template>
