import HomeView from "@/views/Home/HomeView.vue";
import ListView from "@/views/List/ListView.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe("ListView", () => {
  const wrapper = mount(ListView, {});

  it("renders h1 ListVue", () => {
    expect(wrapper.find("h1").exists()).toBeTruthy();
  });

  it("h1 has text 'Список'", () => {
    expect(wrapper.find("h1").text()).toContain("Список");
  });
});

describe("HomeView", () => {
  const wrapper = mount(HomeView, {});

  it("renders h1 HomeVue", () => {
    expect(wrapper.find("h1").exists()).toBeTruthy();
  });

  it("h1 has text 'Добро пожаловать'", () => {
    expect(wrapper.find("h1").text()).toContain("Добро пожаловать");
  });
});
