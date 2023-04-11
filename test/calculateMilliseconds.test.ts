import { calculateMilliseconds } from "../src/utils/calculateMilliseconds";


test('upper case units still returns valid results for seconds', () => {
  expect(calculateMilliseconds(1, "SECONDS")).toBe(1000);
});

test('upper case units still returns valid results for minutes', () => {
  expect(calculateMilliseconds(1, "MINUTES")).toBe(60000);
});

test('upper case units still returns valid results for hours', () => {
  expect(calculateMilliseconds(1, "HOURS")).toBe(3600000);
});

test('upper case units still returns valid results for days', () => {
  expect(calculateMilliseconds(1, "DAYS")).toBe(86400000);
});

test('upper case units still returns valid results for weeks', () => {
  expect(calculateMilliseconds(1, "WEEKS")).toBe(604800000);
});


test('10 seconds equals 10,000 milliseconds', () => {
  expect(calculateMilliseconds(10, "seconds")).toBe(10000);
});

test('10 minutes equals 60,000 milliseconds', () => {
  expect(calculateMilliseconds(10, "minutes")).toBe(600000);
});

test('10 hours equals 36,000,000 milliseconds', () => {
  expect(calculateMilliseconds(10, "hours")).toBe(36000000);
});

test('10 days equals 864,000,000 milliseconds', () => {
  expect(calculateMilliseconds(10, "days")).toBe(864000000);
});

test('10 weeks equals 6,048,000,000 milliseconds', () => {
  expect(calculateMilliseconds(10, "weeks")).toBe(6048000000);
});


test('invalid units will return 0', () => {
  expect(calculateMilliseconds(10, "zoidbergs")).toBe(0);
});
