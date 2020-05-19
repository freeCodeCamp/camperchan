const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('adds 5 + 6 to equal 3', () => {
  expect(sum(5, 6)).toBe(11);
});
