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
    expect(management.data.name).toBe("management");
    expect(management.data.description).toBe("Commands related to server management.");
    expect(subcommands).toHaveLength(3);
  });

  it("has correct private", () => {
    const privateC = subcommands.find((sub) => {
      return sub.name === "private";
    });
    expect(privateC?.description).toBe("Creates a private discussion channel with a user.");
    expect(privateC?.options || "hi").toHaveLength(1);
    expect(privateC?.options[0].name).toBe("target");
    expect(privateC?.options[0].description).toBe("The user to create a private channel with.");
    expect(privateC?.options[0].required).toBeTruthy();
    expect(privateC?.options[0].type).toBe(ApplicationCommandOptionType.User);
  });

  it("has correct role", () => {
    const role = subcommands.find((sub) => {
      return sub.name === "role";
    });
    expect(role?.description).toBe("Creates a post with buttons for self-assignable roles.");
    expect(role?.options || "hi").toHaveLength(7);
    expect(role?.options[0].name).toBe("channel");
    expect(role?.options[0].description).toBe("Channel to create the post in.");
    expect(role?.options[0].required).toBeTruthy();
    expect(role?.options[1].name).toBe("header");
    expect(role?.options[1].description).toBe("Text to include at the top of the post.");
    expect(role?.options[1].required).toBeTruthy();
    expect(role?.options[1].type).toBe(ApplicationCommandOptionType.String);
    expect(role?.options[2].name).toBe("role1");
    expect(role?.options[2].description).toBe("Role to create a button for.");
    expect(role?.options[2].required).toBeTruthy();
    expect(role?.options[2].type).toBe(ApplicationCommandOptionType.Role);
    expect(role?.options[3].name).toBe("role2");
    expect(role?.options[3].description).toBe("Role to create a button for.");
    expect(role?.options[3].required).toBeFalsy();
    expect(role?.options[3].type).toBe(ApplicationCommandOptionType.Role);
    expect(role?.options[4].name).toBe("role3");
    expect(role?.options[4].description).toBe("Role to create a button for.");
    expect(role?.options[4].required).toBeFalsy();
    expect(role?.options[4].type).toBe(ApplicationCommandOptionType.Role);
    expect(role?.options[5].name).toBe("role4");
    expect(role?.options[5].description).toBe("Role to create a button for.");
    expect(role?.options[5].required).toBeFalsy();
    expect(role?.options[5].type).toBe(ApplicationCommandOptionType.Role);
    expect(role?.options[6].name).toBe("role5");
    expect(role?.options[6].description).toBe("Role to create a button for.");
    expect(role?.options[6].required).toBeFalsy();
    expect(role?.options[6].type).toBe(ApplicationCommandOptionType.Role);
  });
});
