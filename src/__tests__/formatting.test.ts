import { formatDistance, formatDate, formatTime } from "../utils/formatting";

describe("formatting utilities", () => {
  test("formatDistance under 1000m", () => {
    expect(formatDistance(250)).toBe("250m");
  });
  test("formatDistance over 1000m rounds to 1 decimal", () => {
    expect(formatDistance(1234)).toBe("1.2km");
  });
  test("formatDate returns locale date string", () => {
    const d = new Date("2024-01-02T10:00:00Z");
    expect(formatDate(d)).toBeDefined();
  });
  test("formatTime returns locale time string", () => {
    const d = new Date("2024-01-02T10:00:00Z");
    expect(formatTime(d)).toBeDefined();
  });
});
