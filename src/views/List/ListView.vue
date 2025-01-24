<script setup lang="ts">
import AppList from "@/components/List/AppList.vue";
import {
  useAddProduct,
  useGetProducts,
  useProductsQty,
  useUpdateProducts,
} from "@/composables/useProducts";
import AppButton from "@/ui/Button/AppButton.vue";
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
  useUpdateProducts();
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
      <AppButton style-type="elevated">
        <RouterLink :to="{ name: 'home' }"> На главную </RouterLink>
      </AppButton>
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
      <AppButton style-type="outlined" @submit.prevent="onSubmit">
        Добавить в список
      </AppButton>
    </form>

    <div class="flex gap-2">
      <span>Всего продуктов:</span>
      <span>{{ qty }}</span>
    </div>

    <AppButton style-type="outlined" class="flex w-fit" @click="onClearList">
      Очистить список
    </AppButton>
  </div>
</template>
