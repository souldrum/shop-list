<script setup lang="ts">
import {
  useDeleteProduct,
  useGetProducts,
  useUpdateProducts,
} from "@/composables/useProducts";
import type { Product } from "@/types/product.types";
import {
  CheckIcon,
  MinusCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";

type Props = {
  product: Product;
  index: number;
};

const products = useGetProducts();

const { product, index } = defineProps<Props>();

const isEdit = ref(false);
const isDone = ref(false);
const isCanceled = ref(false);

const editValue = ref("");

const onEdit = (value: string) => {
  editValue.value = value;

  isEdit.value = !isEdit.value;
};

const onBlur = (id: string) => {
  const targetProduct = products.value.find((p) => p.id === id);

  if (!targetProduct) return;

  if (!editValue.value.trim()) {
    isEdit.value = false;
    return;
  }

  targetProduct.title = editValue.value;
  isEdit.value = false;

  useUpdateProducts();
};

const onDone = (id: string) => {
  const targetProduct = products.value.find((p) => p.id === id);

  if (!targetProduct) return;

  isDone.value = !isDone.value;
  isCanceled.value = false;

  targetProduct.done = isDone.value;
  targetProduct.canceled = isCanceled.value;

  useUpdateProducts();
};

const onCancel = (id: string) => {
  const targetProduct = products.value.find((p) => p.id === id);

  if (!targetProduct) return;

  isCanceled.value = !isCanceled.value;
  isDone.value = false;

  targetProduct.canceled = isCanceled.value;
  targetProduct.done = isDone.value;

  useUpdateProducts();
};

const onDelete = (id: string) => {
  if (!confirm("Удалить?")) return;

  useDeleteProduct(id);
};
</script>

<template>
  <li
    class="flex justify-between max-w-full p-4 gap-2 items-center rounded-xl shadow-elevation-1 bg-surface-container-low text-on-surface-variant"
    :class="{
      'bg-tertiary-container': product.done,
      'bg-error-container': product.canceled,
    }"
  >
    <div v-if="isEdit" class="flex items-center gap-2 mr-auto">
      <input
        class="bg-inherit outline-none border-b border-outline p-1"
        v-model="editValue"
        @blur="onBlur(product.id)"
        @keyup.enter="onBlur(product.id)"
      />

      <CheckIcon
        class="size-6 text-secondary cursor-pointer"
        @click="onBlur(product.id)"
      />
    </div>

    <span v-else class="mr-auto">{{ index + 1 }}. {{ product.title }}</span>
    <div v-if="!isEdit" class="flex gap-2">
      <PencilIcon
        class="size-5 cursor-pointer"
        @click="onEdit(product.title)"
      />
      <CheckIcon
        class="size-5 text-green-500 cursor-pointer"
        @click="onDone(product.id)"
      />
      <MinusCircleIcon
        class="size-5 text-red-500 cursor-pointer"
        @click="onCancel(product.id)"
      />
      <TrashIcon class="size-5 cursor-pointer" @click="onDelete(product.id)" />
    </div>
  </li>
</template>
