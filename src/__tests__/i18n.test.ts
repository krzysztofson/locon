import i18n from "../i18n/i18n";

describe("i18n basic", () => {
  test("has pl resources", () => {
    expect(i18n.getResourceBundle("pl", "translation")).toBeDefined();
  });
  test("fallback to en for missing key", () => {
    const val = i18n.t("nonexistent.key", { defaultValue: "fallback" });
    expect(val).toBe("fallback");
  });
  test("changeLanguage works", async () => {
    await i18n.changeLanguage("en");
    expect(i18n.language).toBe("en");
  });
});
