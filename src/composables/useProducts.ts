import { Products } from "@/services/Products";
import type { Product } from "@/types/product.types";

const {
  getProducts,
  deleteProduct,
  addProduct,
  deleteProducts,
  updateProduct,
  productsRef,
} = Products.getInstance();

export const useProducts = () => {
  return {
    useGetProducts,
    useAddProduct,
    productsRef,
    useUpdateProduct,
    useDeleteProduct,
    useDeleteProducts,
  };
};

const useGetProducts = async (): Promise<Product[]> => {
  const productList = await getProducts();

  return productList;
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
