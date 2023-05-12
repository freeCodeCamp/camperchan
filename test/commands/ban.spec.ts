import { assert } from "chai";
import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import {
  MockChannel,
  MockChatInputCommandInteraction,
  MockGuild,
  MockMember,
  MockUser,
  MockWebhook,
} from "discordjs-testing";

import { ban } from "../../src/commands/ban";
import { Camperbot } from "../../src/interfaces/Camperbot";

const guild = new MockGuild({ name: "freeCodeCamp" });
const user = new MockUser({
  username: "naomi",
  bot: false,
  discriminator: 1,
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  system: false,
});
const bot = new MockUser({
  username: "camperbot",
  bot: true,
  discriminator: 13,
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  system: false,
});
const member = new MockMember({ user, guild });
const channel = new MockChannel({ name: "general", guild, type: 0 });
const target = new MockUser({
  username: "test",
  bot: false,
  discriminator: 2,
  avatar: "https://cdn.nhcarrigan.com/profile.png",
  system: false,
});
const hook = new MockWebhook({
  channel,
  user: bot,
});
guild.members.add(target);

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

  test("should not ban self", async () => {
    const interaction = new MockChatInputCommandInteraction({
      commandName: "ban",
      guild,
      member,
      user,
      channel,
      bot,
    });
    interaction.options.addOption({
      name: "target",
      value: user,
      type: ApplicationCommandOptionType.User,
    });
    interaction.options.addOption({
      name: "reason",
      value: "test",
      type: ApplicationCommandOptionType.String,
    });
    await ban.run({} as Camperbot, interaction.typeCast<"cached">());
    assert.lengthOf(interaction.replies, 1);
    assert.equal(interaction.replies[0].content, "You cannot ban yourself.");
  });

  test("should not ban bot", async () => {
    const interaction = new MockChatInputCommandInteraction({
      commandName: "ban",
      guild,
      member,
      user,
      channel,
      bot,
    });
    interaction.options.addOption({
      name: "target",
      value: bot,
      type: ApplicationCommandOptionType.User,
    });
    interaction.options.addOption({
      name: "reason",
      value: "test",
      type: ApplicationCommandOptionType.String,
    });
    await ban.run(
      { user: bot } as unknown as Camperbot,
      interaction.typeCast<"cached">()
    );
    assert.lengthOf(interaction.replies, 1);
    assert.equal(interaction.replies[0].content, "You cannot ban the bot.");
  });

  test("should not ban unbannable member", async () => {
    const interaction = new MockChatInputCommandInteraction({
      commandName: "ban",
      guild,
      member,
      user,
      channel,
      bot,
    });
    interaction.options.addOption({
      name: "target",
      value: target,
      type: ApplicationCommandOptionType.User,
    });
    interaction.options.addOption({
      name: "reason",
      value: "test",
      type: ApplicationCommandOptionType.String,
    });
    await ban.run({} as Camperbot, interaction.typeCast<"cached">());
    assert.lengthOf(interaction.replies, 1);
    assert.equal(interaction.replies[0].content, "I cannot ban them.");
  });

  test("should ban a member", async () => {
    const targetMember = guild.members.cache.get(target.id);
    if (!targetMember) {
      assert.fail("Target member not found");
      return;
    }
    targetMember.bannable = true;
    const interaction = new MockChatInputCommandInteraction({
      commandName: "ban",
      guild,
      member,
      user,
      channel,
      bot,
    });
    interaction.options.addOption({
      name: "target",
      value: target,
      type: ApplicationCommandOptionType.User,
    });
    interaction.options.addOption({
      name: "reason",
      value: "test",
      type: ApplicationCommandOptionType.String,
    });
    await ban.run(
      { config: { mod_hook: hook.typeCast() } } as Camperbot,
      interaction.typeCast<"cached">()
    );
    assert.lengthOf(interaction.replies, 1);
    assert.equal(interaction.replies[0].content, "They have been banned.");
    assert.equal(hook.messages.cache.size, 1);
    const message = hook.messages.cache.first();
    assert.lengthOf(message?.embeds || [], 1);
  });
});
