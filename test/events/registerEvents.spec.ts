import { describe, assert, test, vi } from "vitest";
import { registerEvents } from "../../src/events/registerEvents.js";

vi.mock("discord.js");

const bot = {
  events: {},
  on:     (event: string, callback: ()=> void): void => {
    bot.events[event] = callback;
  },
};

describe("registerEvents", () => {
  test("registerEvents is a function", () => {
    assert.isFunction(registerEvents);
  });

  test("should register all events", async() => {
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
