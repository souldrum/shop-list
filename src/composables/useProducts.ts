import { Products } from "@/products/Products";
import type { Product } from "@/types/product.types";
import { computed, ref, watch } from "vue";

const {
  getProducts,
  deleteProduct,
  addProduct,
  deleteProducts,
  updateProducts,
} = Products.getInstance();

export const useProducts = () => {
  const productList = getProducts();
  const hideIsDone = ref(false);
  const qtyAnimate = ref("");
  const qtyDoneAnimate = ref("");

  const products = computed<Product[]>(() => {
    return hideIsDone.value
      ? productList.value.filter((p) => !p.done)
      : productList.value;
  });

  const qty = computed<number>(() => {
    return productList.value.length;
  });

  const qtyDone = computed<number>(() => {
    return productList.value.filter((p) => p.done).length;
  });

  watch(qty, () => (qtyAnimate.value = "animate-ping-once"));
  watch(qtyDone, () => (qtyDoneAnimate.value = "animate-ping-once"));

  return {
    productList,
    hideIsDone,
    products,
    qty,
    qtyDone,
    qtyAnimate,
    qtyDoneAnimate,
  };
};

export const useAddProduct = (title: string) => {
  addProduct(title);
};

export const useDeleteProduct = (id: string): void => {
  deleteProduct(id);
};

export const useDeleteProducts = () => {
  deleteProducts();
};

export const useUpdateProducts = () => {
  updateProducts();
};
