<script setup lang="ts">
import { useDeleteProduct } from "@/composables/useProducts";
import { PRODUCTS } from "@/products/Products";
import { useSetStorageData } from "@/storage/useLocalStorage";
import type { Product } from "@/types/product.types";
import {
  CheckIcon,
  MinusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";

type Props = {
  products: Product[];
};

const { products } = defineProps<Props>();

const isEdit = ref(false);
const isDone = ref(false);
const isCanceled = ref(false);

const editValue = ref("");

const onEdit = (id: string, value: string) => {
  editValue.value = value;

  const targetProduct = products.find((p) => p.id === id);

  if (targetProduct) {
    isEdit.value = !isEdit.value;
    targetProduct.edited = isEdit.value;
  }

  useSetStorageData(PRODUCTS, products);
};

const onBlur = (id: string) => {
  const targetProduct = products.find((p) => p.id === id);

  if (!targetProduct) return;

  if (!editValue.value.trim()) {
    isEdit.value = false;
    targetProduct.edited = isEdit.value;
    useSetStorageData(PRODUCTS, products);

    return;
  }

  targetProduct.title = editValue.value;
  isEdit.value = false;
  targetProduct.edited = isEdit.value;
  useSetStorageData(PRODUCTS, products);
};

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
      <div v-if="product.edited" class="flex items-center gap-2 mr-auto">
        <input
          class="bg-inherit outline-none border-b border-gray-200 p-1"
          v-model="editValue"
          @blur="onBlur(product.id)"
          @keyup.enter="onBlur(product.id)"
        />

        <CheckIcon
          class="size-6 text-gray-500 cursor-pointer"
          @click="onBlur(product.id)"
        />
      </div>

      <span v-else class="mr-auto">{{ index + 1 }}. {{ product.title }}</span>
      <div v-if="!product.edited" class="flex gap-2">
        <PencilIcon
          class="size-5 cursor-pointer"
          @click="onEdit(product.id, product.title)"
        />
        <CheckIcon
          class="size-5 text-green-500 cursor-pointer"
          @click="onDone(product.id)"
        />
        <MinusCircleIcon
          class="size-5 text-red-500 cursor-pointer"
          @click="onCancel(product.id)"
        />
        <TrashIcon
          class="size-5 cursor-pointer"
          @click="onDelete(product.id)"
        />
      </div>
    </li>
  </ul>
</template>
