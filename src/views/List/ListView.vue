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
import { PlusIcon } from "@heroicons/vue/24/outline";

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
  if (!productTitle.value.trim()) return;

  const duplicateTitleProduct = products.value.find(
    (p) =>
      p.title.trim().toLowerCase() === productTitle.value.trim().toLowerCase()
  );

  if (duplicateTitleProduct) {
    alert("Этот продукт уже есть в списке");
    return;
  }

  useAddProduct(productTitle.value);

  productTitle.value = "";
};
</script>

<template>
  <div class="flex flex-col gap-4 py-4">
    <div class="flex justify-center items-center gap-2">
      <h1 class="text-title sm:text-headline-sm text-primary">Список</h1>
    </div>

    <div class="text-center text-on-background-op-38" v-if="!products.length">
      Список пуст, добавьте продукты
    </div>
    <AppList v-else :products />

    <form class="flex gap-2 items-center" @submit.prevent="onSubmit">
      <div
        class="border-b focus-within:border-b-2 border-outline-variant pb-3 pl-4 min-w-input text-outline text-body-lg bg-inherit"
      >
        <input
          class="pt-2 bg-transparent outline-none autofill:shadow-input-autocomplete w-11/12 placeholder:text-outline-variant"
          v-model="productTitle"
          placeholder="Новый продукт"
          autoComplete="off"
        />
      </div>

      <AppButton style-type="filled" @submit.prevent="onSubmit">
        <PlusIcon class="size-5" />
        <span class="hidden sm:inline"> Добавить </span>
      </AppButton>
    </form>

    <div class="flex gap-2 text-secondary">
      <span>Всего продуктов:</span>
      <span class="text-secondary-fixed-dim">{{ qty }}</span>
    </div>

    <AppButton
      v-if="products.length"
      style-type="outlined"
      class="flex w-fit"
      @click="onClearList"
    >
      Очистить список
    </AppButton>
  </div>
</template>
