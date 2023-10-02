import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { history } from "../../src/commands/history";

suite("history command", () => {
  test("history command is defined", () => {
    assert.isDefined(history);
  });

  test("history is a command object", () => {
    assert.isDefined(history.data);
    assert.isObject(history.data);
    assert.isDefined(history.run);
    assert.isFunction(history.run);
  });

  test("history command has correct data", () => {
    assert.equal(history.data.name, "history");
    assert.equal(
      history.data.description,
      "Views the moderation history of a user."
    );
    assert.lengthOf(history.data.options, 1);
    const userOption = history.data.options[0].toJSON();
    assert.equal(userOption.name, "target");
    assert.equal(
      userOption.description,
      "The user to view the moderation history of."
    );
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isTrue(userOption.required);
  });
});
