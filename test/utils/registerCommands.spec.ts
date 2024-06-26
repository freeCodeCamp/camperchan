import { MockRest } from "discordjs-testing";
import { describe, assert, test } from "vitest";

import { loadCommands } from "../../src/utils/loadCommands";
import { registerCommands } from "../../src/utils/registerCommands";

describe("registerCommands", () => {
  test("throws when bot is not authenticated", async () => {
    let threw = false;
    await registerCommands({} as never).catch(() => (threw = true));
    assert.isTrue(threw);
  });
  test("registers the command payload", async () => {
    const bot = {
      config: { token: "hi", homeGuild: "home", botId: "user" },
      commands: [],
      contexts: []
    };
    await loadCommands(bot as never);
    const result = (await registerCommands(
      bot as never,
      MockRest as never
    )) as never as MockRest;
    assert.isNotNull(result);
    assert.lengthOf(result.requests, 1);
    const request = result.requests[0];
    assert.strictEqual(request.method, "PUT");
    assert.strictEqual(
      request.route,
      "/applications/user/guilds/home/commands"
    );
    assert.deepEqual(
      request.body,
      // @ts-expect-error Not importing the typedef
      bot.commands.map((c) => c.data.toJSON())
    );
  });
});
