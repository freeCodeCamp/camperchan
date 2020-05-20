const { shouldThank } = require('./thanks');

describe('thanks', () => {
  describe('shouldThank', () => {
    test('returns false if normal text', () =>
      expect(
        shouldThank({
          content: 'I am normal text, nothing to see here'
        }).toEqual(false)
      ));
    test.todo('returns true if thanking 1 user');
    test.todo('returns false if just mentioning users');
  });
  describe('isSelfThanking', () => {
    test.todo('returns false only other users mentioned');
    test.todo('returns true if author is the only user mentioned');
    test.todo('returns false if auth and other users are mentioned');
    test.todo('should only thank users');
  });
  describe('getSelfThankMessage', () => {
    test.todo('returns message');
  });
  describe('getThankMessage', () => {
    test.todo('returns message with mentioned users');
    test.todo('returns message with mentioned users, but not with author');
    test.todo('returns message without non user mentions');
  });
});
