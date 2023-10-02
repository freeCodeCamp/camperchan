import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { unmute } from "../../src/commands/unmute";

suite("unmute command", () => {
  test("unmute command is defined", () => {
    assert.isDefined(unmute);
  });

  test("unmute is a command object", () => {
    assert.isDefined(unmute.data);
    assert.isObject(unmute.data);
    assert.isDefined(unmute.run);
    assert.isFunction(unmute.run);
  });

  test("unmute command has correct data", () => {
    assert.equal(unmute.data.name, "unmute");
    assert.equal(unmute.data.description, "Unmutes a user.");
    assert.lengthOf(unmute.data.options, 2);
    const userOption = unmute.data.options[0].toJSON();
    const reasonOption = unmute.data.options[1].toJSON();
    assert.equal(userOption.name, "target");
    assert.equal(userOption.description, "The user to unmute.");
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isTrue(userOption.required);
    assert.equal(reasonOption.name, "reason");
    assert.equal(reasonOption.description, "The reason for unmuting the user.");
    assert.equal(reasonOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(reasonOption.required);
  });
});
