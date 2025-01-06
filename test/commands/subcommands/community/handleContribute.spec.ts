import { ChannelType, type EmbedBuilder } from "discord.js";
import {
  MockChannel,
  MockChatInputCommandInteraction,
  MockGuild,
  MockMember,
  MockUser,
} from "discordjs-testing";
import { describe, expect, it } from "vitest";
import { handleContribute }
  from "../../../../src/commands/subcommands/community/handleContribute.js";

const guild = new MockGuild({
  name: "it Guild",
});
const bot = new MockUser({
  avatar:        "it",
  bot:           true,
  discriminator: 1234,
  system:        false,
  username:      "it Bot",
});
const user = new MockUser({
  avatar:        "it",
  bot:           false,
  discriminator: 1234,
  system:        false,
  username:      "it User",
});
const member = new MockMember({
  guild,
  user,
});
const channel = new MockChannel({
  guild: guild,
  name:  "it-channel",
  type:  ChannelType.GuildText,
});

describe("contribute Handler", () => {
  it("should send an embed with contributing information", async() => {
    const command = new MockChatInputCommandInteraction({
      bot:            bot,
      channel:        channel,
      commandName:    "community",
      guild:          guild,
      member:         member,
      subcommandName: "contribute",
      user:           user,
    });
    await handleContribute.execute({} as never, command as never);
    expect(command.replies).toHaveLength(1);
    const embed = command.replies?.[0]?.embeds?.[0] as EmbedBuilder;
    expect(embed.data.title).toBe("Helpful Links!");
    const [ first, second, third, fourth, fifth ] = embed.data.fields || [];
    expect(first.name).toBe("Code of Conduct");
    expect(first.value).toBe("https://freecodecamp.org/news/code-of-conduct");
    expect(second.name).toBe("Moderator Handbook");
    expect(second.value).toBe("https://contribute.freecodecamp.org/#/flight-manuals/moderator-handbook");
    expect(third.name).toBe("Contributing Guidelines");
    expect(third.value).toBe("https://contribute.freecodecamp.org/");
    expect(fourth.name).toBe("News Contributing");
    expect(fourth.value).toBe("https://www.freecodecamp.org/news/developer-news-style-guide/");
    expect(fifth.name).toBe("Pull Request Reviews");
    expect(fifth.value).toBe(`[PRs Ready for Review](https://github.com/freeCodeCamp/freeCodeCamp/pulls?q=is%3Aopen+is%3Apr+-label%3A%22status%3A+blocked%22+-label%3A%22status%3A+merge+conflict%22+status%3Asuccess+draft%3Afalse)`);
  });
});
