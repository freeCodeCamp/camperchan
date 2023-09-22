import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { close } from "../../src/commands/close";

suite("close command", () => {
  test("close command is defined", () => {
    assert.isDefined(close);
  });

  test("close is a command object", () => {
    assert.isDefined(close.data);
    assert.isObject(close.data);
    assert.isDefined(close.run);
    assert.isFunction(close.run);
  });

  test("close command has correct configuration", () => {
    assert.isTrue(close.guildOnly, "close command is not guild only");
  });

  test("close command has correct data", () => {
    assert.equal(close.data.name, "close");
    assert.equal(
      close.data.description,
      "Close an issue or pull request under the freeCodeCamp organisation."
    );
    assert.lengthOf(close.data.options, 2);
    const stringOption = close.data.options[0].toJSON();
    const integerOption = close.data.options[1].toJSON();
    assert.equal(stringOption.name, "repository");
    assert.equal(
      stringOption.description,
      "The name of the repository, under freeCodeCamp's GitHub org, to comment on"
    );
    assert.equal(stringOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(stringOption.required);
    assert.equal(integerOption.name, "number");
    assert.equal(
      integerOption.description,
      "The number of the issue or pull to close."
    );
    assert.equal(integerOption.type, ApplicationCommandOptionType.Integer);
    assert.isTrue(integerOption.required);
  });
});
