import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { tags } from "../../src/commands/tags";

suite("tags command", () => {
  test("tags command is defined", () => {
    assert.isDefined(tags);
  });

  test("tags is a command object", () => {
    assert.isDefined(tags.data);
    assert.isObject(tags.data);
    assert.isDefined(tags.run);
    assert.isFunction(tags.run);
  });

  test("tags command has correct configuration", () => {
    assert.isTrue(tags.guildOnly, "tags command is not guild only");
  });

  test("tags command has correct data", () => {
    assert.equal(tags.data.name, "tags");
    assert.equal(
      tags.data.description,
      "Display a commonly used canned response."
    );
    assert.lengthOf(tags.data.options, 2);
    const tagOption = tags.data.options[0].toJSON();
    const userOption = tags.data.options[1].toJSON();
    assert.equal(tagOption.name, "name");
    assert.equal(tagOption.description, "The name of the tag to display.");
    assert.equal(tagOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(tagOption.required);
    // @ts-expect-error - autocomplete is not defined in the typings
    assert.isTrue(tagOption.autocomplete);
    assert.equal(userOption.name, "user");
    assert.equal(userOption.description, "User to ping with the tag response?");
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isFalse(userOption.required);
  });
});
