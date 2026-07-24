import { test, expect } from "@playwright/test";

test.describe("AstroKalki Critical Smoke Tests", () => {
  test("Reader page loads and displays verse data", async ({ page }) => {
    // Navigate to the reader gallery
    await page.goto("/reader");
    await expect(page.locator("h1")).toContainText("Sanskrit Reader");

    // Navigate to a specific verse
    const firstVerseLink = page.locator("a[href^='/reader/']").first();
    await expect(firstVerseLink).toBeVisible();
    
    const verseTitle = await firstVerseLink.locator("h2").innerText();
    await firstVerseLink.click();

    // Verify verse details are rendered
    await expect(page.locator("h1")).toContainText(verseTitle);
    await expect(page.locator("text=Commentary")).toBeVisible();
  });

  test("Archivist keyword search returns results", async ({ page }) => {
    await page.goto("/archivist");
    await expect(page.locator("h1")).toContainText("The Custodian");

    // Enter a search query that should reliably match some siddhi or manuscript
    const searchInput = page.locator("input[placeholder*='Seek...']");
    await searchInput.fill("sri");
    await searchInput.press("Enter");

    // Look for results container or the results themselves
    // Since FTS is either mocked or hits the DB fallback, we expect results
    await expect(page.locator("text=The Custodian has traced")).toBeVisible({ timeout: 10000 });
    
    // There should be at least one result card
    const resultCards = page.locator("a[href*='/siddhi/'], a[href*='/manuscripts/']");
    expect(await resultCards.count()).toBeGreaterThan(0);
  });

  test("Japa Counter functionality", async ({ page }) => {
    await page.goto("/japa");
    await expect(page.locator("h1")).toContainText("Japa Mālā");

    const tapButton = page.locator("button:has-text('TAP')");
    await expect(tapButton).toBeVisible();
    await tapButton.click();
    await tapButton.click();
    
    // Check if count updated to 2
    // Look for the exact text '2' in the big count display
    await expect(page.locator("p.text-5xl", { hasText: "2" })).toBeVisible();
  });

  test.describe("Vault Setup & Journal Encrypted Roundtrip", () => {
    test("First-run setup, unlock, read/write, and lock", async ({ page }) => {
      // Go to Vault settings
      await page.goto("/vault");

      // We should see the Setup screen if it's the first run
      await expect(page.locator("h1")).toContainText("Create Your Private Vault");
      
      const passInput = page.locator("input[type='password']").first();
      const confirmInput = page.locator("input[type='password']").nth(1);
      
      // Attempt invalid setup
      await passInput.fill("123");
      await page.locator("button:has-text('Create Vault')").click();
      await expect(page.locator("text=Passphrase must be at least 6 characters")).toBeVisible();

      // Valid setup
      await passInput.fill("my-secure-pass");
      await confirmInput.fill("my-secure-pass");
      await page.locator("button:has-text('Create Vault')").click();

      // Should transition to unlocked state
      await expect(page.locator("h1")).toContainText("Vault Unlocked");

      // Navigate to Journal
      await page.goto("/journal");
      await expect(page.locator("h1")).toContainText("Practice Journal");

      // Add a journal entry
      await page.locator("button:has-text('New Entry')").click();
      await page.locator("label:has-text('Insights') + textarea").fill("This is a secret note.");
      await page.locator("button:has-text('Save Entry')").click();

      // Ensure it displays
      await expect(page.locator("text=This is a secret note.")).toBeVisible();

      // Lock the vault
      await page.goto("/vault");
      await page.locator("button:has-text('Lock Vault')").click();

      // Should show unlock screen
      await expect(page.locator("h1")).toContainText("Unlock Your Vault");

      // Verify incorrect unlock is rejected
      await passInput.fill("wrong-pass");
      await page.locator("button:has-text('Unlock')").click();
      await expect(page.locator("text=Incorrect passphrase")).toBeVisible();

      // Verify correct unlock
      await passInput.fill("my-secure-pass");
      await page.locator("button:has-text('Unlock')").click();
      
      // Should go back to unlocked view
      await expect(page.locator("h1")).toContainText("Vault Unlocked");

      // Verify journal entry persists
      await page.goto("/journal");
      await expect(page.locator("text=This is a secret note.")).toBeVisible();
    });
  });
});
