import { Products } from "@/services/Products";
import type { Product } from "@/types/product.types";
import { computed, ref } from "vue";

const {
  getProducts,
  deleteProduct,
  addProduct,
  deleteProducts,
  updateProduct,
  productsRef,
} = Products.getInstance();

export const useProducts = () => {
  const productList = getProducts();
  const hideIsDone = ref(false);

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

  return { productList, hideIsDone, products, qty, qtyDone };
};

const useAddProduct = async (title: string): Promise<void> => {
  await addProduct(title);
};

const useDeleteProduct = async (id: string): Promise<void> => {
  await deleteProduct(id);
};

const useDeleteProducts = async (): Promise<void> => {
  await deleteProducts();
};

const useUpdateProduct = async (
  id: string,
  product: Product
): Promise<void> => {
  await updateProduct(id, product);
};
