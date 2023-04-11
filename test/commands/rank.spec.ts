import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { rank } from "../../src/commands/rank";

suite("rank command", () => {
  test("rank command is defined", () => {
    assert.isDefined(rank);
  });

  test("rank is a command object", () => {
    assert.isDefined(rank.data);
    assert.isObject(rank.data);
    assert.isDefined(rank.run);
    assert.isFunction(rank.run);
  });

  test("rank command has correct configuration", () => {
    assert.isTrue(rank.guildOnly, "rank command is not guild only");
  });

  test("rank command has correct data", () => {
    assert.equal(rank.data.name, "rank");
    assert.equal(rank.data.description, "See your level in our community.");
    assert.lengthOf(rank.data.options, 1);
    const userOption = rank.data.options[0].toJSON();
    assert.equal(userOption.name, "target");
    assert.equal(userOption.description, "The user to check the level of.");
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isFalse(userOption.required);
  });
});
