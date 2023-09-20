import { assert } from "chai";

import { registerEvents } from "../../src/events/registerEvents";

const bot = {
  events: {},
  on: (event: string, callback: () => void) => {
    bot.events[event] = callback;
  },
};

suite("registerEvents", () => {
  test("registerEvents is a function", () => {
    assert.isFunction(registerEvents);
  });

  test("should register all events", async () => {
    await registerEvents(bot as never);
    assert.property(bot.events, "ready");
    assert.property(bot.events, "messageCreate");
    assert.property(bot.events, "messageUpdate");
    assert.property(bot.events, "messageDelete");
    assert.property(bot.events, "interactionCreate");
    assert.property(bot.events, "threadCreate");
    assert.property(bot.events, "guildMemberAdd");
    assert.property(bot.events, "guildMemberRemove");
  });
});
