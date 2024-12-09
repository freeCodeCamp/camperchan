import { ApplicationCommandType } from "discord.js";
import { describe, assert, it } from "vitest";
import { translate } from "../../src/contexts/translate.js";

describe("translate context", () => {
  it("translate context should be a context object.", () => {
    assert.isDefined(translate.data);
    assert.isObject(translate.data);
    assert.isDefined(translate.run);
    assert.isFunction(translate.run);
  });
  it("translate context should be formatted correctly.", () => {
    assert.equal(translate.data.name, "translate");
    assert.equal(translate.data.type, ApplicationCommandType.Message);
  });
});
