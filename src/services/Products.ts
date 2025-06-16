import type { Product } from "@/types/product.types";
import { ref, type Ref } from "vue";
import { pb } from "./pb";

export const PRODUCTS = "products";

export class Products {
  private static _instanceRef: Products;
  private _products: Ref<Product[]> = ref([]);
  private readonly _selfName = this.constructor.name;

  private constructor() {}

  static getInstance(): Products {
    if (Products._instanceRef === undefined) {
      Products._instanceRef = new Products();
    }

    return Products._instanceRef;
  }

  public get productsRef() {
    return this._products;
  }

  public getProducts = async (): Promise<Product[]> => {
    try {
      this._products.value = await pb
        .collection(PRODUCTS)
        .getFullList<Product>({
          requestKey: null,
        });

      return this._products.value;
    } catch (error) {
      throw new Error(this._selfName + "_getProducts: " + error);
    }
  };

  public addProduct = async (title: string): Promise<void> => {
    const newProduct = {
      title,
      done: false,
      canceled: false,
      deleted: false,
    };

    try {
      const product = await pb.collection(PRODUCTS).create<Product>(newProduct);

      console.log("Добавлен новый продукт: ", product);

      await this.updateProducts();
    } catch (error) {
      throw new Error(this._selfName + "_addProduct: " + error);
    }
  };

  public deleteProduct = async (id: string): Promise<void> => {
    try {
      await pb.collection(PRODUCTS).delete(id);

      await this.updateProducts();
    } catch (error) {
      throw new Error(this._selfName + "_deleteProduct: " + error);
    }
  };

  public deleteProducts = async (): Promise<void> => {
    try {
      const products = await this.getProducts();

      for (const product of products) {
        await pb.collection(PRODUCTS).delete(product.id);
      }

      await this.updateProducts();
    } catch (error) {
      throw new Error(this._selfName + "_deleteProducts: " + error);
    }
  };

  public updateProduct = async (
    id: string,
    product: Product
  ): Promise<void> => {
    try {
      const updated = await pb.collection(PRODUCTS).update(id, product);

      console.log("Обновлен продукт: ", updated);

      await this.updateProducts();
    } catch (error) {
      throw new Error(this._selfName + "_updateProducts: " + error);
    }
  };

  private updateProducts = async () => {
    await this.getProducts();
  };
}
