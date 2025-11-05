import PocketBase from "pocketbase";

export const pb = new PocketBase("https://pb.ivahaev.ru:1143");
export const userId = pb.authStore.record?.id;
