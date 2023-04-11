import {
  calculateMilliseconds,
  timeMeasurements,
} from "../utils/calculateMilliseconds";

test("10 seconds equals 10,000 milliseconds", () => {
  expect(calculateMilliseconds(10, timeMeasurements.SECONDS)).toBe(10000);
});

test("10 minutes equals 60,000 milliseconds", () => {
  expect(calculateMilliseconds(10, timeMeasurements.MINUTES)).toBe(600000);
});

test("10 hours equals 36,000,000 milliseconds", () => {
  expect(calculateMilliseconds(10, timeMeasurements.HOURS)).toBe(36000000);
});

test("10 days equals 864,000,000 milliseconds", () => {
  expect(calculateMilliseconds(10, timeMeasurements.DAYS)).toBe(864000000);
});

test("10 weeks equals 6,048,000,000 milliseconds", () => {
  expect(calculateMilliseconds(10, timeMeasurements.WEEKS)).toBe(6048000000);
});
