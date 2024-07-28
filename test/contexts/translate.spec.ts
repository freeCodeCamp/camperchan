import { ApplicationCommandType } from "discord.js";
import { describe, assert, test } from "vitest";
import { translate } from "../../src/contexts/translate.js";

describe("translate context", () => {
  test("translate context should be a context object.", () => {
    assert.isDefined(translate.data);
    assert.isObject(translate.data);
    assert.isDefined(translate.run);
    assert.isFunction(translate.run);
  });
  test("translate context should be formatted correctly.", () => {
    assert.equal(translate.data.name, "translate");
    assert.equal(translate.data.type, ApplicationCommandType.Message);
  });
});
