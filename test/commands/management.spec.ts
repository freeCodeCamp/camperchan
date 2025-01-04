import {
  ApplicationCommandOptionType,
  type SlashCommandSubcommandBuilder,
} from "discord.js";
import { describe, expect, it } from "vitest";
import { management } from "../../src/commands/management.js";

describe("management command", () => {
  const subcommands = management.data.options.filter(
    (opt) => {
      return opt.toJSON().type === ApplicationCommandOptionType.Subcommand;
    },
  ) as Array<SlashCommandSubcommandBuilder>;

  it("has correct data", () => {
    assert.strictEqual(management.data.name, "management");
    assert.strictEqual(
      management.data.description,
      "Commands related to server management.",
    );
    expect(subcommands).toHaveLength(3);
  });

  it("has correct private", () => {
    const privateC = subcommands.find((sub) => {
      return sub.name === "private";
    });
    assert.strictEqual(
      privateC?.description,
      "Creates a private discussion channel with a user.",
    );
    expect(privateC?.options || "hi").toHaveLength(1);
    assert.strictEqual(privateC?.options[0].name, "target");
    assert.strictEqual(
      privateC?.options[0].description,
      "The user to create a private channel with.",
    );
    expect(privateC?.options[0].required).toBeTruthy();
    assert.strictEqual(
      privateC?.options[0].type,
      ApplicationCommandOptionType.User,
    );
  });

  it("has correct role", () => {
    const role = subcommands.find((sub) => {
      return sub.name === "role";
    });
    assert.strictEqual(
      role?.description,
      "Creates a post with buttons for self-assignable roles.",
    );
    expect(role?.options || "hi").toHaveLength(7);
    assert.strictEqual(role?.options[0].name, "channel");
    assert.strictEqual(
      role?.options[0].description,
      "Channel to create the post in.",
    );
    expect(role?.options[0].required).toBeTruthy();
    assert.strictEqual(role?.options[1].name, "header");
    assert.strictEqual(
      role?.options[1].description,
      "Text to include at the top of the post.",
    );
    expect(role?.options[1].required).toBeTruthy();
    assert.strictEqual(
      role?.options[1].type,
      ApplicationCommandOptionType.String,
    );
    assert.strictEqual(role?.options[2].name, "role1");
    assert.strictEqual(
      role?.options[2].description,
      "Role to create a button for.",
    );
    expect(role?.options[2].required).toBeTruthy();
    assert.strictEqual(
      role?.options[2].type,
      ApplicationCommandOptionType.Role,
    );
    assert.strictEqual(role?.options[3].name, "role2");
    assert.strictEqual(
      role?.options[3].description,
      "Role to create a button for.",
    );
    expect(role?.options[3].required).toBeFalsy();
    assert.strictEqual(
      role?.options[3].type,
      ApplicationCommandOptionType.Role,
    );
    assert.strictEqual(role?.options[4].name, "role3");
    assert.strictEqual(
      role?.options[4].description,
      "Role to create a button for.",
    );
    expect(role?.options[4].required).toBeFalsy();
    assert.strictEqual(
      role?.options[4].type,
      ApplicationCommandOptionType.Role,
    );
    assert.strictEqual(role?.options[5].name, "role4");
    assert.strictEqual(
      role?.options[5].description,
      "Role to create a button for.",
    );
    expect(role?.options[5].required).toBeFalsy();
    assert.strictEqual(
      role?.options[5].type,
      ApplicationCommandOptionType.Role,
    );
    assert.strictEqual(role?.options[6].name, "role5");
    assert.strictEqual(
      role?.options[6].description,
      "Role to create a button for.",
    );
    expect(role?.options[6].required).toBeFalsy();
    assert.strictEqual(
      role?.options[6].type,
      ApplicationCommandOptionType.Role,
    );
  });
});
