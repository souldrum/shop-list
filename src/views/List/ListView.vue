<script setup lang="ts">
import AppList from "@/components/List/AppList.vue";
import { useProducts } from "@/composables/useProducts";
import type { Product } from "@/types/product.types";
import AppButton from "@/ui/Button/AppButton.vue";
import {
  EyeIcon,
  EyeSlashIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/vue/24/outline";
import { computed, onBeforeMount, ref, watch } from "vue";
import { VueSpinnerDots } from "vue3-spinners";

const { useGetProducts, useDeleteProducts, useAddProduct, productsRef } =
  useProducts();
const productList = productsRef;
const loading = ref(true);
const productTitle = ref("");
const qtyAnimate = ref("");
const qtyDoneAnimate = ref("");

const hideIsDone = ref(false);

const products = computed<Product[]>(() => {
  if (!productList.value) return [];

  return hideIsDone.value
    ? productList.value.filter((p) => !p.done)
    : productList.value;
});

const qty = computed<number>(() => {
  return productList.value ? productList.value.length : 0;
});

const qtyDone = computed<number>(() => {
  if (!productList.value) return 0;

  return productList.value.filter((p) => p.done).length;
});

const onClearList = async () => {
  if (!confirm("Очистить список?")) return;

  await useDeleteProducts();
};

const onHideIsDone = () => {
  hideIsDone.value = !hideIsDone.value;
};

const onQtyDoneAnimationEnd = async () => {
  qtyDoneAnimate.value = "";

  if (qtyDone.value !== 0 && qtyDone.value === qty.value) {
    if (confirm("Отлично! \nВсе продукты собраны! \nХотите очистить список?")) {
      await useDeleteProducts();
    }
  }
};

const onSubmit = async () => {
  if (!productTitle.value.trim()) return;

  const duplicateTitleProduct = products.value.find(
    (p) =>
      p.title.trim().toLowerCase() === productTitle.value.trim().toLowerCase()
  );

  if (duplicateTitleProduct) {
    alert("Этот продукт уже есть в списке");
    return;
  }

  await useAddProduct(productTitle.value);

  productTitle.value = "";
};

onBeforeMount(async () => {
  try {
    await useGetProducts();
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

watch(qty, () => (qtyAnimate.value = "animate-ping-once"));
watch(qtyDone, () => (qtyDoneAnimate.value = "animate-ping-once"));
</script>

<template>
  <div class="flex flex-col gap-4 py-4">
    <div class="flex justify-center items-center gap-2">
      <h1 class="text-title sm:text-headline-sm text-primary">Список</h1>
    </div>

    <VueSpinnerDots class="self-center text-primary text-6xl" v-if="loading" />
    <div v-else>
      <div class="text-center text-on-background-op-38" v-if="!qty">
        Список пуст, добавьте продукты
      </div>
      <AppList v-else :products />
    </div>

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
            <ShoppingCartIcon class="size-14" />
            <div
              class="relative flex justify-center items-center rounded-full border h-6 w-6 -translate-x-4 bg-done"
              :class="qtyDoneAnimate"
              @animationend="onQtyDoneAnimationEnd"
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
