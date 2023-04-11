import { assert } from "chai";
import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

import { warn } from "../../src/commands/warn";

suite("warn command", () => {
  test("warn command is defined", () => {
    assert.isDefined(warn);
  });

  test("warn is a command object", () => {
    assert.isDefined(warn.data);
    assert.isObject(warn.data);
    assert.isDefined(warn.run);
    assert.isFunction(warn.run);
  });

  test("warn command has correct configuration", () => {
    assert.isTrue(warn.guildOnly, "warn command is not guild only");
    assert.include(
      warn.requiredPermissions,
      PermissionFlagsBits.KickMembers,
      "warn command does not require KickMembers permission"
    );
  });

  test("warn command has correct data", () => {
    assert.equal(warn.data.name, "warn");
    assert.equal(warn.data.description, "Issues a warning to a user.");
    assert.lengthOf(warn.data.options, 2);
    const userOption = warn.data.options[0].toJSON();
    const reasonOption = warn.data.options[1].toJSON();
    assert.equal(userOption.name, "target");
    assert.equal(userOption.description, "The user to warn.");
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isTrue(userOption.required);
    assert.equal(reasonOption.name, "reason");
    assert.equal(
      reasonOption.description,
      "The reason for issuing this warning."
    );
    assert.equal(reasonOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(reasonOption.required);
  });
});
