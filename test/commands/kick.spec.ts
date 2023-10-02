import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { kick } from "../../src/commands/kick";

suite("kick command", () => {
  test("kick command is defined", () => {
    assert.isDefined(kick);
  });

  test("kick is a command object", () => {
    assert.isDefined(kick.data);
    assert.isObject(kick.data);
    assert.isDefined(kick.run);
    assert.isFunction(kick.run);
  });

  test("kick command has correct data", () => {
    assert.equal(kick.data.name, "kick");
    assert.equal(kick.data.description, "Kicks a user from the server.");
    assert.lengthOf(kick.data.options, 2);
    const userOption = kick.data.options[0].toJSON();
    const reasonOption = kick.data.options[1].toJSON();
    assert.equal(userOption.name, "target");
    assert.equal(userOption.description, "The user to kick.");
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isTrue(userOption.required);
    assert.equal(reasonOption.name, "reason");
    assert.equal(reasonOption.description, "The reason for kicking the user.");
    assert.equal(reasonOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(reasonOption.required);
  });
});
