<script setup lang="ts">
import AppList from "@/components/List/AppList.vue";
import {
  useAddProduct,
  useGetProducts,
  useProductsQty,
  useUpdateProducts,
} from "@/composables/useProducts";
import AppButton from "@/ui/Button/AppButton.vue";
import { ref, watch, watchEffect } from "vue";
import { PlusIcon } from "@heroicons/vue/24/outline";

const products = useGetProducts();
const productTitle = ref("");
const qty = ref(useProductsQty());
const changeQtyAnimate = ref("");

const updateQty = () => {
  qty.value = useProductsQty();
};

watch(qty, () => addQtyAnimate());

const addQtyAnimate = () => {
  changeQtyAnimate.value = "!text-error animate-ping";

  setTimeout(() => {
    changeQtyAnimate.value = "";
  }, 800);
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

    <div
      class="flex flex-col gap-2 px-2 sticky bottom-0 rounded-t-xl bg-surface"
    >
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
        <span class="text-secondary-fixed-dim" :class="changeQtyAnimate">{{
          qty
        }}</span>
      </div>
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
