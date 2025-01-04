import { describe, expect, it, vi, expect } from "vitest";
import { registerEvents } from "../../src/events/registerEvents.js";

vi.mock("discord.js");

const bot = {
  events: {},
  on:     (event: string, callback: ()=> void): void => {
    bot.events[event] = callback;
  },
};

describe("registerEvents", () => {
  it("registerEvents is a function", () => {
    expect(registerEvents).toBeTypeOf("function");
  });

  it("should register all events", async() => {
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
