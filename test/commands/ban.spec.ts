import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { ban } from "../../src/commands/ban";

suite("ban command", () => {
  test("ban command is defined", () => {
    assert.isDefined(ban);
  });

  test("ban is a command object", () => {
    assert.isDefined(ban.data);
    assert.isObject(ban.data);
    assert.isDefined(ban.run);
    assert.isFunction(ban.run);
  });

  test("ban command has correct data", () => {
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
});
