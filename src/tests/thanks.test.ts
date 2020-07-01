import {
  shouldThank,
  isSelfThanking,
  getSelfThankMessage,
  getThankMessage
} from '../commands/thanks';
import { Message } from 'discord.js';

describe('thanks', () => {
  describe('shouldThank', () => {
    test('returns false if normal text', () =>
      expect(
        shouldThank(({
          content: 'I am normal text, nothing to see here',
          mentions: {
            users: new Map()
          }
        } as Partial<Message>) as never)
      ).toEqual(false));
    test('returns true if thanking with thanks', () =>
      expect(
        shouldThank(({
          content: 'Thanks <@86890631690977280>',
          mentions: { users: new Map().set('86890631690977280', {}) }
        } as Partial<Message>) as never)
      ).toEqual(true));
    test('returns true if thanking self with THANK YOU', () =>
      expect(
        shouldThank(({
          content: 'THANK YOU <@86890631690977280>',
          mentions: { users: new Map().set('86890631690977280', {}) }
        } as Partial<Message>) as never)
      ).toEqual(true));
    test('returns false if thanking no one', () =>
      expect(
        shouldThank(({
          content: 'THANK YOU NO ONE!',
          mentions: { users: new Map() }
        } as Partial<Message>) as never)
      ).toEqual(false));
  });
  describe('isSelfThanking', () => {
    test('returns false only other users mentioned', () =>
      expect(
        isSelfThanking(({
          mentions: {
            users: new Map().set('userId', {})
          },
          author: {
            id: 'otherUserId'
          }
        } as Partial<Message>) as never)
      ).toEqual(false));
    test('returns true if author is the only user mentioned', () =>
      expect(
        isSelfThanking(({
          mentions: {
            users: new Map().set('userId', {
              id: 'userId'
            })
          },
          author: {
            id: 'userId'
          }
        } as Partial<Message>) as never)
      ).toEqual(true));
    test('returns false if author and other users are mentioned', () =>
      expect(
        isSelfThanking(({
          mentions: {
            users: new Map()
              .set('userId', {
                id: 'userId'
              })
              .set('otherUserId', {})
          },
          author: {
            id: 'userId'
          }
        } as Partial<Message>) as never)
      ).toEqual(false));
  });
  describe('getSelfThankMessage', () => {
    test('returns message', () =>
      expect(
        getSelfThankMessage(({
          author: {
            toString: () => 'bradtaniguchi'
          }
        } as Partial<Message>) as never)
      ).toEqual(
        `Sorry bradtaniguchi, you can't send brownie points to yourself!`
      ));
  });
  describe('getThankMessage', () => {
    test('returns message with mentioned users', () =>
      expect(
        getThankMessage(({
          author: { toString: () => '<@brad>' },
          content: 'thanks <@userId>'
        } as Partial<Message>) as never)
      ).toEqual('<@brad> sends brownie points to <@userId> ✨👍✨'));
    test('returns message with mentioned users, but not with author', () =>
      expect(
        getThankMessage(({
          author: { toString: () => '<@brad>' },
          content: 'thanks <@userId> <@brad>'
        } as Partial<Message>) as never)
      ).toEqual('<@brad> sends brownie points to <@userId> ✨👍✨'));
    test('does not thank the same user twice, if mentioned twice', () =>
      expect(
        getThankMessage(({
          author: { toString: () => '<@brad>' },
          content: 'thanks <@userId> <@userId>'
        } as Partial<Message>) as never)
      ).toEqual('<@brad> sends brownie points to <@userId> ✨👍✨'));
  });
});
