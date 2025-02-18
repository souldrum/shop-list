<script setup lang="ts">
import AppList from "@/components/List/AppList.vue";
import {
  useAddProduct,
  useDeleteProducts,
  useGetProducts,
} from "@/composables/useProducts";
import type { Product } from "@/types/product.types";
import AppButton from "@/ui/Button/AppButton.vue";
import {
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/outline";
import { computed, ref, watch } from "vue";

const allProducts = useGetProducts();
const productTitle = ref("");
const qtyAnimate = ref("");
const qtyDoneAnimate = ref("");

const hideIsDone = ref(false);

const products = computed<Product[]>(() => {
  return hideIsDone.value
    ? allProducts.value.filter((p) => !p.done)
    : allProducts.value;
});

const qty = computed<number>(() => {
  return allProducts.value.length;
});

const qtyDone = computed<number>(() => {
  return allProducts.value.filter((p) => p.done).length;
});

watch(qty, () => (qtyAnimate.value = "animate-ping-once"));
watch(qtyDone, () => (qtyDoneAnimate.value = "animate-ping-once"));

const onClearList = () => {
  if (!confirm("Очистить список?")) return;

  useDeleteProducts();
};

const onHideIsDone = () => {
  hideIsDone.value = !hideIsDone.value;
};

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

    <div class="text-center text-on-background-op-38" v-if="!qty">
      Список пуст, добавьте продукты
    </div>
    <AppList v-else :products />

    <div
      class="flex flex-col gap-2 p-2 sticky bottom-0 rounded-t-xl bg-surface"
    >
      <form class="flex gap-2 items-center" @submit.prevent="onSubmit">
        <div
          class="border-b focus-within:border-b-2 border-outline-variant pb-3 pl-4 min-w-input text-outline text-body-lg bg-inherit"
        >
          <input
            class="pt-2 bg-transparent outline-hidden autofill:shadow-input-autocomplete w-11/12 placeholder:text-outline-variant"
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
        <span>Продуктов в списке:</span>
        <span
          class="text-secondary-fixed-dim"
          :class="qtyAnimate"
          @animationend="qtyAnimate = ''"
          >{{ qty }}</span
        >

        <Transition name="shoppingCart">
          <div v-show="qtyDone" class="flex ml-4">
            <ShoppingCartIcon class="size-14"> </ShoppingCartIcon>
            <div
              class="relative flex justify-center items-center rounded-full h-6 w-6 -translate-x-4 bg-done"
              :class="qtyDoneAnimate"
              @animationend="qtyDoneAnimate = ''"
            >
              {{ qtyDone }}
            </div>
          </div>
        </Transition>
      </div>

      <div class="flex gap-2">
        <AppButton v-show="qty" style-type="outlined" @click="onClearList">
          Очистить
        </AppButton>

        <AppButton
          v-show="qtyDone"
          style-type="tonal"
          class="bg-done! text-on-tertiary-container!"
          @click="onHideIsDone"
        >
          <EyeIcon v-if="hideIsDone" class="size-5" />
          <EyeSlashIcon v-else class="size-5" />
          <span>отмеченные</span>
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shoppingCart-enter-active,
.shoppingCart-leave-active {
  transition: all 0.3s ease;
}

.shoppingCart-enter-from,
.shoppingCart-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
