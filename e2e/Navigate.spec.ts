import { test, expect } from "@playwright/test";

// See here how to get started:
// https://playwright.dev/docs/intro

test("По пути '/' переходи на домашнюю страницу", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("heading", { name: "Добро пожаловать" }).click();

  await expect(page.locator("h1")).toHaveText("Добро пожаловать");
});

test('При нажатии "Список" переходим на страницу списка', async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Список" }).click();

  await expect(page.locator("h1")).toHaveText("Список");
});

test("По пути /list переходим на страницу списка", async ({ page }) => {
  await page.goto("http://localhost:5173/list");
  await page.getByRole("link", { name: "Список" }).click();

  await expect(page.locator("h1")).toHaveText("Список");
});

test("Нажав на 'Домашняя', попадаем на Домашнюю страницу", async ({ page }) => {
  await page.goto("http://localhost:5173/list");
  await page.getByRole("button", { name: "Домашняя" }).click();

  await expect(page.locator("h1")).toHaveText("Добро пожаловать");
});
