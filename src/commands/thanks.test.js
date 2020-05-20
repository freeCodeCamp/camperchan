const { shouldThank } = require('./thanks');

describe('thanks', () => {
  describe('shouldThank', () => {
    test('returns false if normal text', () =>
      expect(
        shouldThank({
          content: 'I am normal text, nothing to see here'
        }).toEqual(false)
      ));
    test('returns true if thanking with thanks', () =>
      expect(
        shouldThank({
          content: 'Thanks <@86890631690977280>'
        })
      ).toEqual(true));
    test('returns true if thanking self with THANK YOU', () =>
      expect(
        shouldThank({
          content: 'THANK YOU <@86890631690977280>'
        })
      ));
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
