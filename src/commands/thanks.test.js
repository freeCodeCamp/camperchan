const {
  shouldThank,
  getSelfThankMessage,
  isSelfThanking
} = require('./thanks');

describe('thanks', () => {
  describe('shouldThank', () => {
    test('returns false if normal text', () =>
      expect(
        shouldThank({
          content: 'I am normal text, nothing to see here'
        })
      ).toEqual(false));
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
      ).toEqual(true));
  });
  describe('isSelfThanking', () => {
    test('returns false only other users mentioned', () =>
      expect(
        isSelfThanking({
          mentions: {
            users: new Map().set('userId', {})
          },
          author: {
            id: 'otherUserId'
          }
        })
      ).toEqual(false));
    test('returns true if author is the only user mentioned', () =>
      expect(
        isSelfThanking({
          mentions: {
            users: new Map().set('userId', {
              id: 'userId'
            })
          },
          author: {
            id: 'userId'
          }
        })
      ).toEqual(true));
    test.todo('returns false if auth and other users are mentioned');
    test.todo('should only thank users');
  });
  describe('getSelfThankMessage', () => {
    test('returns message', () =>
      expect(
        getSelfThankMessage({
          author: {
            toString: () => 'bradtaniguchi'
          }
        })
      ).toEqual(
        `Sorry bradtaniguchi, you can't send brownie points to yourself! ✨✨`
      ));
  });
  describe('getThankMessage', () => {
    test.todo('returns message with mentioned users');
    test.todo('returns message with mentioned users, but not with author');
    test.todo('returns message without non user mentions');
  });
});
