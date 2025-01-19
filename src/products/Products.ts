import type { Product } from "@/types/product.types";
import { ref, type Ref } from "vue";

const productList: Product[] = [
  { id: "1", title: "Колбаса", done: false, canceled: false, deleted: false },
  { id: "2", title: "Хлеб", done: false, canceled: false, deleted: false },
  { id: "3", title: "Сыр", done: false, canceled: false, deleted: false },
  { id: "4", title: "Сметана", done: false, canceled: false, deleted: false },
  {
    id: "5",
    title: "Мариночка",
    done: false,
    canceled: false,
    deleted: false,
  },
];

export class Products {
  private static _instanceRef: Products;

  private _products: Ref<Product[]> = ref(productList);

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
      id: String(Date.now()),
      title,
      done: false,
      canceled: false,
      deleted: false,
    };

    this._products.value = [...this._products.value, newProduct];
  };

  public deleteProduct = (id: string): void => {
    this._products.value = this._products.value.filter((p) => p.id !== id);
  };

  public getProductsQty = (): number => {
    return this._products.value.length;
  };
}
