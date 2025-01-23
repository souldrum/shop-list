import {
  useGetStorageData,
  useSetStorageData,
} from "@/storage/useLocalStorage";
import type { Product } from "@/types/product.types";
import { v4 as uuidv4 } from "uuid";
import { ref, type Ref } from "vue";

export const PRODUCTS = "products";

export class Products {
  private static _instanceRef: Products;

  private _products: Ref<Product[]> = ref(
    useGetStorageData<Product>(PRODUCTS, [])
  );

  private constructor() {}

  static getInstance(): Products {
    if (Products._instanceRef === undefined) {
      Products._instanceRef = new Products();
    }

    return Products._instanceRef;
  }

  public getProducts = (): Ref<Product[]> => {
    return this._products;
  };

  public addProduct = (title: string): void => {
    const newProduct: Product = {
      id: uuidv4(),
      title,
      done: false,
      canceled: false,
      deleted: false,
    };

    this._products.value = [...this._products.value, newProduct];
    useSetStorageData(PRODUCTS, this._products.value);
  };

  public deleteProduct = (id: string): void => {
    this._products.value = this._products.value.filter((p) => p.id !== id);
    useSetStorageData(PRODUCTS, this._products.value);
  };

  public getProductsQty = (): number => {
    return this._products.value.length;
  };

  public updateProducts = (): void => {
    useSetStorageData(PRODUCTS, this._products.value);
  };
}
