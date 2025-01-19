<script setup lang="ts">
import { useDeleteProduct, useGetProducts } from "@/composables/useProducts";
import {
  CheckIcon,
  MinusCircleIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";

const products = useGetProducts();

const isDone = ref(false);
const isCanceled = ref(false);

const onDone = (id: string) => {
  const targetProduct = products.value.find((p) => p.id === id);

  if (targetProduct) {
    isDone.value = !isDone.value;
    isCanceled.value = false;

    targetProduct.done = isDone.value;
    targetProduct.canceled = isCanceled.value;
  }
};

const onCancel = (id: string) => {
  const targetProduct = products.value.find((p) => p.id === id);

  if (targetProduct) {
    isCanceled.value = !isCanceled.value;
    isDone.value = false;

    targetProduct.canceled = isCanceled.value;
    targetProduct.done = isDone.value;
  }
};

const onDelete = (id: string) => {
  if (!confirm("Удалить?")) return;

  useDeleteProduct(id);
};
</script>

<template>
  <ul class="flex flex-col gap-2 list-decimal">
    <li
      class="flex justify-between p-2 gap-2 items-center border border-gray-200 rounded"
      :class="{ 'bg-green-100': done, 'bg-red-200': canceled }"
      v-for="{ id, title, done, canceled } of products"
      :key="id"
    >
      <span class="mr-auto">{{ title }}</span>
      <CheckIcon
        class="size-4 text-green-500 cursor-pointer"
        @click="onDone(id)"
      />
      <MinusCircleIcon
        class="size-4 text-red-500 cursor-pointer"
        @click="onCancel(id)"
      />
      <TrashIcon class="size-4 cursor-pointer" @click="onDelete(id)" />
    </li>
  </ul>
</template>
