import { describe, expect, it, vi } from "vitest";
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
    expect(bot.events).toHaveProperty("ready");
    expect(bot.events).toHaveProperty("messageCreate");
    expect(bot.events).toHaveProperty("messageUpdate");
    expect(bot.events).toHaveProperty("messageDelete");
    expect(bot.events).toHaveProperty("interactionCreate");
    expect(bot.events).toHaveProperty("threadCreate");
    expect(bot.events).toHaveProperty("guildMemberAdd");
    expect(bot.events).toHaveProperty("guildMemberRemove");
  });
});
