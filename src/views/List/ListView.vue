<script setup lang="ts">
import AppList from "@/components/List/AppList.vue";
import {
  useAddProduct,
  useGetProducts,
  useProductsQty,
} from "@/composables/useProducts";
import { PRODUCTS } from "@/products/Products";
import { useSetStorageData } from "@/storage/useLocalStorage";
import { ref, watchEffect } from "vue";

const products = useGetProducts();
const productTitle = ref("");
const qty = ref(useProductsQty());

const updateQty = () => {
  qty.value = useProductsQty();
};

const onClearList = () => {
  if (!confirm("Очистить список?")) return;

  products.value = [];
  useSetStorageData(PRODUCTS, products.value);
};

watchEffect(updateQty);

const onSubmit = () => {
  useAddProduct(productTitle.value);

  productTitle.value = "";
};
</script>

<template>
  <div class="flex flex-col gap-4 py-4">
    <div class="flex items-center gap-2">
      <h1>Список</h1>
      <button class="border rounded p-1">
        <RouterLink :to="{ name: 'home' }"> На главную </RouterLink>
      </button>
    </div>

    <AppList :products />

    <form class="flex gap-2 items-center" @submit.prevent="onSubmit">
      <label for="newItem">Новый товар</label>
      <input
        id="newItem"
        type="text"
        class="border border-gray-200 rounded p-1 outline-gray-200"
        v-model="productTitle"
        autocomplete="off"
      />
      <button class="border rounded p-1" @submit.prevent="onSubmit">
        Добавить в список
      </button>
    </form>

    <div class="flex gap-2">
      <span>Всего продуктов</span>
      <span>{{ qty }}</span>
    </div>

    <button
      class="flex w-fit border border-gray-200 rounded p-1"
      @click="onClearList"
    >
      Очистить список
    </button>
  </div>
</template>
