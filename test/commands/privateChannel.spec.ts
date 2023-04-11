import { assert } from "chai";
import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";

import { privateChannel } from "../../src/commands/privateChannel";

suite("privateChannel command", () => {
  test("privateChannel command is defined", () => {
    assert.isDefined(privateChannel);
  });

  test("privateChannel is a command object", () => {
    assert.isDefined(privateChannel.data);
    assert.isObject(privateChannel.data);
    assert.isDefined(privateChannel.run);
    assert.isFunction(privateChannel.run);
  });

  test("privateChannel command has correct configuration", () => {
    assert.isTrue(
      privateChannel.guildOnly,
      "privateChannel command is not guild only"
    );
    assert.include(
      privateChannel.requiredPermissions,
      PermissionFlagsBits.ModerateMembers,
      "privateChannel command does not require ModerateMembers permission"
    );
  });

  test("privateChannel command has correct data", () => {
    assert.equal(privateChannel.data.name, "private");
    assert.equal(
      privateChannel.data.description,
      "Creates a private discussion channel with a user."
    );
    assert.lengthOf(privateChannel.data.options, 1);
    const userOption = privateChannel.data.options[0].toJSON();
    assert.equal(userOption.name, "target");
    assert.equal(
      userOption.description,
      "The user to create a private channel with."
    );
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isTrue(userOption.required);
  });
});
