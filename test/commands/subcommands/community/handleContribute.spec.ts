import { ChannelType, EmbedBuilder } from "discord.js";
import {
  MockChannel,
  MockChatInputCommandInteraction,
  MockGuild,
  MockMember,
  MockUser
} from "discordjs-testing";
import { describe, assert, test } from "vitest";

import { handleContribute } from "../../../../src/commands/subcommands/community/handleContribute";

const guild = new MockGuild({
  name: "Test Guild"
});
const bot = new MockUser({
  username: "Test Bot",
  avatar: "test",
  discriminator: 1234,
  bot: true,
  system: false
});
const user = new MockUser({
  username: "Test User",
  avatar: "test",
  discriminator: 1234,
  bot: false,
  system: false
});
const member = new MockMember({
  guild,
  user
});
const channel = new MockChannel({
  name: "test-channel",
  guild,
  type: ChannelType.GuildText
});

describe("contribute Handler", () => {
  test("should send an embed with contributing information", async () => {
    const command = new MockChatInputCommandInteraction({
      commandName: "community",
      subcommandName: "contribute",
      guild,
      bot,
      user,
      member,
      channel
    });
    await handleContribute.execute({} as never, command as never);
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
