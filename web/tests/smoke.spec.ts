import { test, expect } from "@playwright/test";

test.describe("home page", () => {
  test("loads with the main sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Loopwork/);
    await expect(
      page.getByRole("heading", { name: "Built to be handed over." }),
    ).toBeVisible();
  });

  test("renders case studies and services from Sanity", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#work article")).toHaveCount(3);
    await expect(page.locator("#services article")).toHaveCount(3);
  });
});

test("a case study page opens from the home page", async ({ page }) => {
  await page.goto("/");
  await page.locator("#work h3 a").first().click();

  await expect(page).toHaveURL(/\/work\//);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Sample project")).toBeVisible();
});

test.describe("contact form", () => {
  test("shows errors when submitted empty", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByRole("button", { name: "Send project note" }).click();

    await expect(page.getByRole("alert")).toContainText("Please fix 3 fields");
    await expect(page.getByText("Please enter your work email.")).toBeVisible();
  });

  test("rejects a malformed email", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByLabel("Work email").fill("ross@");
    await page.getByLabel("Name").click(); // moves focus away, triggers blur validation

    await expect(
      page.getByText("That email doesn’t look right."),
    ).toBeVisible();
  });

  test("shows the success note when valid", async ({ page }) => {
    await page.goto("/#contact");
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Work email").fill("test@example.com");
    await page
      .getByLabel("What are you trying to fix?")
      .fill("Our onboarding emails are a mess.");
    await page.getByRole("button", { name: "Send project note" }).click();

    await expect(page.getByText("Note saved in the demo.")).toBeVisible();
  });
});
