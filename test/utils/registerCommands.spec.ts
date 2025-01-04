import { MockRest } from "discordjs-testing";
import { describe, expect, it } from "vitest";
import { loadCommands } from "../../src/utils/loadCommands.js";
import { registerCommands } from "../../src/utils/registerCommands.js";
import type { Command } from "../../src/interfaces/command.js";
import type { Context } from "../../src/interfaces/context.js";

describe("registerCommands", () => {
  it("throws when bot is not authenticated", async() => {
    let threw = false;
    await registerCommands({} as never).catch(() => {
      threw = true;
    });
    expect(threw).toBeTruthy();
  });
  it("registers the command payload", async() => {
    const bot: {
      commands: Array<Command>;
      config:   { botId: string; homeGuild: string; token: string };
      contexts: Array<Context>;
    } = {
      commands: [],
      config:   { botId: "user", homeGuild: "home", token: "hi" },
      contexts: [],
    };
    await loadCommands(bot as never);
    const result = (await registerCommands(
      bot as never,
      MockRest as never,
    )) as never as MockRest;
    assert.isNotNull(result);
    expect(result.requests).toHaveLength(1);
    const request = result.requests[0];
    assert.strictEqual(request.method, "PUT");
    assert.strictEqual(
      request.route,
      "/applications/user/guilds/home/commands",
    );
    assert.deepEqual(
      request.body,
      bot.commands.map((c) => {
        return c.data.toJSON();
      }) as never,
    );
  });
});
