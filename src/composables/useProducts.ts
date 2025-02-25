import { Products } from "@/products/Products";
import type { Product } from "@/types/product.types";
import { type Ref } from "vue";

const {
  getProducts,
  deleteProduct,
  addProduct,
  deleteProducts,
  updateProducts,
} = Products.getInstance();

export const useGetProducts = (): Ref<Product[]> => {
  const productList = getProducts();

  return productList;
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
