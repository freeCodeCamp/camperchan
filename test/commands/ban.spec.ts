import { assert } from "chai";
import {
  ApplicationCommandOptionType,
  ChannelType,
  PermissionFlagsBits,
} from "discord.js";
import {
  MockChannel,
  MockChatInputCommandInteraction,
  MockGuild,
  MockMember,
  MockUser,
  MockWebhook,
} from "discordjs-testing";

import { ban } from "../../src/commands/ban";
import { Database } from "../__mocks__/Database.mock";

const db = new Database();
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
const banUser = new MockUser({
  username: "Test Ban User",
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  discriminator: 1234,
  bot: false,
  system: false,
});
const member = new MockMember({
  guild,
  user,
});
const banMember = new MockMember({
  guild,
  user: banUser,
});
banMember.bannable = true;
const channel = new MockChannel({
  name: "test-channel",
  guild,
  type: ChannelType.GuildText,
});
const debugHook = new MockWebhook({
  channel,
  user: bot,
});

suite.only("ban command", () => {
  test("should be defined", () => {
    assert.isDefined(ban);
  });

  test("should be a command object", () => {
    assert.isDefined(ban.data);
    assert.isObject(ban.data);
    assert.isDefined(ban.run);
    assert.isFunction(ban.run);
  });

  test("should have correct configuration", () => {
    assert.isTrue(ban.guildOnly, "ban command is not guild only");
    assert.include(
      ban.requiredPermissions,
      PermissionFlagsBits.BanMembers,
      "ban command does not require BanMembers permission"
    );
  });

  test("should have correct data", () => {
    assert.equal(ban.data.name, "ban");
    assert.equal(ban.data.description, "Bans a user from the server.");
    assert.lengthOf(ban.data.options, 2);
    const userOption = ban.data.options[0].toJSON();
    const reasonOption = ban.data.options[1].toJSON();
    assert.equal(userOption.name, "target");
    assert.equal(userOption.description, "The user to ban.");
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isTrue(userOption.required);
    assert.equal(reasonOption.name, "reason");
    assert.equal(reasonOption.description, "The reason for banning the user.");
    assert.equal(reasonOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(reasonOption.required);
  });

  test("should not allow banning self", async () => {
    const command = new MockChatInputCommandInteraction({
      commandName: "ban",
      guild,
      bot,
      user,
      member,
      channel,
      options: [
        {
          name: "target",
          type: ApplicationCommandOptionType.User,
          value: user,
        },
        {
          name: "reason",
          type: ApplicationCommandOptionType.String,
          value: "Banning myself hehe",
        },
      ],
    });
    await ban.run(bot as never, command as never);
    assert.lengthOf(command.replies, 1);
    assert.equal(
      command.replies[0].content,
      "You cannot ban yourself.",
      "Incorrect reply"
    );
  });

  test("should not allow banning bot", async () => {
    const command = new MockChatInputCommandInteraction({
      commandName: "ban",
      guild,
      bot,
      user,
      member,
      channel,
      options: [
        {
          name: "target",
          type: ApplicationCommandOptionType.User,
          value: bot,
        },
        {
          name: "reason",
          type: ApplicationCommandOptionType.String,
          value: "Banning the bot hehe",
        },
      ],
    });
    await ban.run({ user: bot } as never, command as never);
    assert.lengthOf(command.replies, 1);
    assert.equal(
      command.replies[0].content,
      "You cannot ban the bot.",
      "Incorrect reply"
    );
  });

  test("should ban the member", async () => {
    const command = new MockChatInputCommandInteraction({
      commandName: "ban",
      guild,
      bot,
      user,
      member,
      channel,
      options: [
        {
          name: "target",
          type: ApplicationCommandOptionType.User,
          value: banUser,
        },
        {
          name: "reason",
          type: ApplicationCommandOptionType.String,
          value: "Real ban?",
        },
      ],
    });
    await ban.run(
      { user: bot, db, config: { mod_hook: debugHook } } as never,
      command as never
    );
    assert.lengthOf(command.replies, 1);
    assert.equal(command.replies[0].content, "They have been banned.");
  });
});
