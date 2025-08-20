import {
  validateEmail,
  validatePassword,
  validateRequired,
} from "../utils/validation";

describe("validation utilities", () => {
  test("validateEmail valid", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });
  test("validateEmail invalid", () => {
    expect(validateEmail("invalid-email")).toBe(false);
  });
  test("validatePassword true for length >= 8", () => {
    expect(validatePassword("12345678")).toBe(true);
  });
  test("validatePassword false for short", () => {
    expect(validatePassword("1234")).toBe(false);
  });
  test("validateRequired trims whitespace", () => {
    expect(validateRequired("  value  ")).toBe(true);
  });
  test("validateRequired false for empty", () => {
    expect(validateRequired("   ")).toBe(false);
  });
});
