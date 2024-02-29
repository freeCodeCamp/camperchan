import { assert } from "chai";
import { ChannelType, EmbedBuilder } from "discord.js";
import {
  MockChannel,
  MockChatInputCommandInteraction,
  MockGuild,
  MockMember,
  MockUser
} from "discordjs-testing";

import { handleCodeOfConduct } from "../../../../src/commands/subcommands/community/handleCodeOfConduct";

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

suite("codeOfConduct Handler", () => {
  test("should send an embed with the code of conduct", async () => {
    const command = new MockChatInputCommandInteraction({
      commandName: "community",
      subcommandName: "code-of-conduct",
      guild,
      bot,
      user,
      member,
      channel
    });
    await handleCodeOfConduct.execute({} as never, command as never);
    assert.equal(command.replies.length, 1);
    const embed = command.replies?.[0]?.embeds?.[0] as EmbedBuilder;
    assert.equal(embed.data.title, "freeCodeCamp Code of Conduct");
    assert.equal(
      embed.data.description,
      "These are the basic rules for interacting with the FreeCodeCamp community on any platform, including this Discord server. You can read the full document on the [FreeCodeCamp article](https://freecodecamp.org/news/code-of-conduct)"
    );
    const [first, second, third] = embed.data.fields || [];
    assert.equal(first.name, "No harassment");
    assert.equal(
      first.value,
      "Harassment includes sexual language and imagery, deliberate intimidation, stalking, name-calling, unwelcome attention, libel, and any malicious hacking or social engineering. freeCodeCamp should be a harassment-free experience for everyone, regardless of gender, gender identity and expression, age, sexual orientation, disability, physical appearance, body size, race, national origin, or religion (or lack thereof)."
    );
    assert.equal(second.name, "No trolling");
    assert.equal(
      second.value,
      "Trolling includes posting inflammatory comments to provoke an emotional response or disrupt discussions."
    );
    assert.equal(third.name, "No spamming");
    assert.equal(
      third.value,
      "Spamming includes posting off-topic messages to disrupt discussions, promoting a product, soliciting donations, advertising a job / internship / gig, or flooding discussions with files or text."
    );
    assert.equal(
      embed.data.footer?.text,
      "Thank you for following freeCodeCamp's Code of Conduct"
    );
    assert.equal(
      embed.data.url,
      "https://freecodecamp.org/news/code-of-conduct"
    );
  });
});
