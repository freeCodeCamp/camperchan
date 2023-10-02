import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { unban } from "../../src/commands/unban";

suite("unban command", () => {
  test("unban command is defined", () => {
    assert.isDefined(unban);
  });

  test("unban is a command object", () => {
    assert.isDefined(unban.data);
    assert.isObject(unban.data);
    assert.isDefined(unban.run);
    assert.isFunction(unban.run);
  });

  test("unban command has correct data", () => {
    assert.equal(unban.data.name, "unban");
    assert.equal(unban.data.description, "Removes a user's ban.");
    assert.lengthOf(unban.data.options, 2);
    const userOption = unban.data.options[0].toJSON();
    const reasonOption = unban.data.options[1].toJSON();
    assert.equal(userOption.name, "target");
    assert.equal(userOption.description, "The user to unban.");
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isTrue(userOption.required);
    assert.equal(reasonOption.name, "reason");
    assert.equal(
      reasonOption.description,
      "The reason for unbanning the user."
    );
    assert.equal(reasonOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(reasonOption.required);
  });
});
