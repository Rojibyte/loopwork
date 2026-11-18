import { test, expect } from "@playwright/test";

test("home page has SEO basics", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /loopwork-smoky\.vercel\.app/,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /.+/,
  );
});

test("case study structured data matches the visible page", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#work h3 a").first().click();

  const raw = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  const data = JSON.parse(raw ?? "{}");

  expect(data["@type"]).toBe("WebPage");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(data.name);
});
