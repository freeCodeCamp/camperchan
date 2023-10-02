import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { mute } from "../../src/commands/mute";

suite("mute command", () => {
  test("mute command is defined", () => {
    assert.isDefined(mute);
  });

  test("mute is a command object", () => {
    assert.isDefined(mute.data);
    assert.isObject(mute.data);
    assert.isDefined(mute.run);
    assert.isFunction(mute.run);
  });

  test("mute command has correct data", () => {
    assert.equal(mute.data.name, "mute");
    assert.equal(mute.data.description, "Mutes a user.");
    assert.lengthOf(mute.data.options, 4);
    const userOption = mute.data.options[0].toJSON();
    const durationOption = mute.data.options[1].toJSON();
    const unitOption = mute.data.options[2].toJSON();
    // @ts-expect-error Choices do exist, just not type defed.
    const unitOptionChoices = mute.data.options[2].choices as {
      name: string;
      value: string;
    }[];
    const reasonOption = mute.data.options[3].toJSON();
    assert.equal(userOption.name, "target");
    assert.equal(userOption.description, "The user to mute.");
    assert.equal(userOption.type, ApplicationCommandOptionType.User);
    assert.isTrue(userOption.required);
    assert.equal(durationOption.name, "duration");
    assert.equal(
      durationOption.description,
      "The length of time to mute the user."
    );
    assert.equal(durationOption.type, ApplicationCommandOptionType.Integer);
    assert.isTrue(durationOption.required);
    assert.equal(unitOption.name, "unit");
    assert.equal(unitOption.description, "The unit of time for the duration.");
    assert.equal(unitOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(unitOption.required);
    assert.lengthOf(unitOptionChoices, 4);
    assert.equal(unitOptionChoices[0].name, "Minutes");
    assert.equal(unitOptionChoices[0].value, "minutes");
    assert.equal(unitOptionChoices[1].name, "Hours");
    assert.equal(unitOptionChoices[1].value, "hours");
    assert.equal(unitOptionChoices[2].name, "Days");
    assert.equal(unitOptionChoices[2].value, "days");
    assert.equal(unitOptionChoices[3].name, "Weeks");
    assert.equal(unitOptionChoices[3].value, "weeks");
    assert.equal(reasonOption.name, "reason");
    assert.equal(reasonOption.description, "The reason for muting the user.");
    assert.equal(reasonOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(reasonOption.required);
  });
});
