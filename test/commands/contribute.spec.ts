import { assert } from "chai";
import { ChannelType, EmbedBuilder } from "discord.js";
import {
  MockChannel,
  MockChatInputCommandInteraction,
  MockGuild,
  MockMember,
  MockUser,
} from "discordjs-testing";

import { contribute } from "../../src/commands/contribute";

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

suite("contribute command", () => {
  test("contribute command is defined", () => {
    assert.isDefined(contribute);
  });

  test("contribute is a command object", () => {
    assert.isDefined(contribute.data);
    assert.isObject(contribute.data);
    assert.isDefined(contribute.run);
    assert.isFunction(contribute.run);
  });

  test("contribute command has correct data", () => {
    assert.equal(contribute.data.name, "contribute");
    assert.equal(
      contribute.data.description,
      "Returns helpful links for folks interested in contributing."
    );
    assert.lengthOf(contribute.data.options, 0);
  });

  test("should send an embed with contributing information", async () => {
    const command = new MockChatInputCommandInteraction({
      commandName: "coc",
      guild,
      bot,
      user,
      member,
      channel,
    });
    await contribute.run({} as never, command as never);
    assert.equal(command.replies.length, 1);
    const embed = command.replies?.[0]?.embeds?.[0] as EmbedBuilder;
    assert.equal(embed.data.title, "Helpful Links!");
    const [first, second, third, fourth, fifth] = embed.data.fields || [];
    assert.equal(first.name, "Code of Conduct");
    assert.equal(first.value, "https://freecodecamp.org/news/code-of-conduct");
    assert.equal(second.name, "Moderator Handbook");
    assert.equal(
      second.value,
      "https://contribute.freecodecamp.org/#/flight-manuals/moderator-handbook"
    );
    assert.equal(third.name, "Contributing Guidelines");
    assert.equal(third.value, "https://contribute.freecodecamp.org/");
    assert.equal(fourth.name, "News Contributing");
    assert.equal(
      fourth.value,
      "https://www.freecodecamp.org/news/developer-news-style-guide/"
    );
    assert.equal(fifth.name, "Pull Request Reviews");
    assert.equal(
      fifth.value,
      "[PRs Ready for Review](https://github.com/freeCodeCamp/freeCodeCamp/pulls?q=is%3Aopen+is%3Apr+-label%3A%22status%3A+blocked%22+-label%3A%22status%3A+merge+conflict%22+status%3Asuccess+draft%3Afalse)"
    );
  });
});
