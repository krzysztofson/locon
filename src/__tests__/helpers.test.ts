import { generateId, calculateDistance, debounce } from "../utils/helpers";

jest.useFakeTimers();

describe("helpers utilities", () => {
  test("generateId produces a string of length >= 5", () => {
    expect(generateId().length).toBeGreaterThanOrEqual(5);
  });

  test("calculateDistance between same point is 0", () => {
    expect(calculateDistance(10, 20, 10, 20)).toBeCloseTo(0);
  });

  test("calculateDistance returns positive distance", () => {
    const d = calculateDistance(52.2297, 21.0122, 52.4064, 16.9252); // Warsaw -> Poznan
    expect(d).toBeGreaterThan(250000);
  });

  test("debounce delays execution", () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);
    debounced();
    jest.advanceTimersByTime(299);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
