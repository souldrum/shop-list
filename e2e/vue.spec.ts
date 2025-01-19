import { test, expect } from "@playwright/test";

// See here how to get started:
// https://playwright.dev/docs/intro

test("visit home page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("heading", { name: "Добро пожаловать" }).click();

  await expect(page.locator("h1")).toHaveText("Добро пожаловать");
});

test('when click "Перейти к списку" going to List page', async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.getByRole("link", { name: "Перейти к списку" }).click();
  await page.getByText("Список").click();

  await expect(page.locator("h1")).toHaveText("Список");
});
