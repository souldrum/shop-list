import HomeView from "@/views/Home/HomeView.vue";
import ListView from "@/views/List/ListView.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("Заголовок у HomeView", () => {
  const wrapper = mount(HomeView, {});

  it("Отрисовка h1 на HomeVue", () => {
    expect(wrapper.find("h1").exists()).toBeTruthy();
  });

  it("h1 содержит текст 'Добро пожаловать'", () => {
    expect(wrapper.find("h1").text()).toContain("Добро пожаловать");
  });
});

describe("Заголовок у ListView", () => {
  const wrapper = mount(ListView, {});

  it("Отрисовка h1 на ListVue", () => {
    expect(wrapper.find("h1").exists()).toBeTruthy();
  });

  it("h1 содержит текст 'Список'", () => {
    expect(wrapper.find("h1").text()).toContain("Список");
  });
});
