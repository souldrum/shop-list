import { useRoute } from "vue-router";

export type RouteName = "home" | "list";

export const useAppRoute = () => {
  const route = useRoute();

  const isHome = () => route.name === "home";
  const isList = () => route.name === "list";

  return {
    isHome,
    isList,
  };
};
