import { assert } from "chai";
import {
  ApplicationCommandOptionType,
  SlashCommandSubcommandBuilder,
} from "discord.js";

import { github } from "../../src/commands/github";

suite("github command", () => {
  const subcommands = github.data.options.filter(
    (opt) => opt.toJSON().type === ApplicationCommandOptionType.Subcommand
  ) as SlashCommandSubcommandBuilder[];

  test("has correct data", () => {
    assert.strictEqual(github.data.name, "github");
    assert.strictEqual(
      github.data.description,
      "Commands related to managing github"
    );
    assert.isFalse(github.data.dm_permission);
    assert.lengthOf(subcommands, 2);
  });

  test("has correct close", () => {
    const close = subcommands.find((sub) => sub.name === "close");
    assert.exists(close);
    assert.strictEqual(close?.name, "close");
    assert.strictEqual(
      close?.description,
      "Close an issue or pull request under the freeCodeCamp organisation."
    );
    assert.lengthOf(close?.options || "hi", 4);
    assert.strictEqual(close?.options?.[0].name, "repository");
    assert.strictEqual(
      close?.options?.[0].description,
      "The name of the repository, under freeCodeCamp's GitHub org, to comment on"
    );
    assert.isTrue(close?.options?.[0].required);
    assert.strictEqual(
      close?.options?.[0].type,
      ApplicationCommandOptionType.String
    );
    assert.strictEqual(close?.options?.[1].name, "number");
    assert.strictEqual(
      close?.options?.[1].description,
      "The number of the issue or pull to close."
    );
    assert.isTrue(close?.options?.[1].required);
    assert.strictEqual(
      close?.options?.[1].type,
      ApplicationCommandOptionType.Integer
    );
    assert.strictEqual(close?.options?.[2].name, "comment");
    assert.strictEqual(
      close?.options?.[2].description,
      "The comment to leave when closing. Defaults to the standard close message."
    );
    assert.isFalse(close?.options?.[2].required);
    assert.strictEqual(
      close?.options?.[2].type,
      ApplicationCommandOptionType.String
    );
    assert.strictEqual(close?.options?.[3].name, "spam");
    assert.strictEqual(
      close?.options?.[3].description,
      "Label the PR as spam for Hacktoberfest?"
    );
    assert.isFalse(close?.options?.[3].required);
    assert.strictEqual(
      close?.options?.[3].type,
      ApplicationCommandOptionType.Boolean
    );
  });

  test("has correct comment", () => {
    const comment = subcommands.find((sub) => sub.name === "comment");
    assert.exists(comment);
    assert.strictEqual(comment?.name, "comment");
    assert.strictEqual(
      comment?.description,
      "Adds a friendly comment to an issue or pull request. Scoped to the freeCodeCamp organisation."
    );
    assert.lengthOf(comment?.options || "hi", 3);
    assert.strictEqual(comment?.options?.[0].name, "repository");
    assert.strictEqual(
      comment?.options?.[0].description,
      "The name of the repository, under freeCodeCamp's GitHub org, to comment on"
    );
    assert.isTrue(comment?.options?.[0].required);
    assert.strictEqual(
      comment?.options?.[0].type,
      ApplicationCommandOptionType.String
    );
    assert.strictEqual(comment?.options?.[1].name, "number");
    assert.strictEqual(
      comment?.options?.[1].description,
      "The number of the pull request to comment on."
    );
    assert.isTrue(comment?.options?.[1].required);
    assert.strictEqual(
      comment?.options?.[1].type,
      ApplicationCommandOptionType.Integer
    );
    assert.strictEqual(comment?.options?.[2].name, "message");
    assert.strictEqual(
      comment?.options?.[2].description,
      "The message to post."
    );
    assert.isTrue(comment?.options?.[2].required);
    assert.strictEqual(
      comment?.options?.[2].type,
      ApplicationCommandOptionType.String
    );
  });
});
