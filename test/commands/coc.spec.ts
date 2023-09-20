import { assert } from "chai";
import {
  MockChannel,
  MockChatInputCommandInteraction,
  MockGuild,
  MockMember,
  MockUser,
  MockWebhook,
} from "discordjs-testing";

import { coc } from "../../src/commands/coc";
import { ChannelType } from "discord.js";

const guild = new MockGuild({
  name: "Test Guild",
});
const bot = new MockUser({
  username: "Test Bot",
  avatar: "test",
  discriminator: 1234,
  bot: true,
  system: false,
});
const user = new MockUser({
  username: "Test User",
  avatar: "test",
  discriminator: 1234,
  bot: false,
  system: false,
});
const member = new MockMember({
  guild,
  user,
});
const channel = new MockChannel({
  name: "test-channel",
  guild,
  type: ChannelType.GuildText,
});
const debugHook = new MockWebhook({
  channel,
  user: bot,
});

suite("coc command", () => {
  test("coc command is defined", () => {
    assert.isDefined(coc);
  });

  test("coc is a command object", () => {
    assert.isDefined(coc.data);
    assert.isObject(coc.data);
    assert.isDefined(coc.run);
    assert.isFunction(coc.run);
  });

  test("coc command has correct data", () => {
    assert.equal(coc.data.name, "coc");
    assert.equal(
      coc.data.description,
      "Returns information on freeCodeCamp's Code of Conduct."
    );
    assert.lengthOf(coc.data.options, 0);
  });
});
