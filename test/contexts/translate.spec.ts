import { assert } from "chai";
import { ApplicationCommandType } from "discord.js";

import { translate } from "../../src/contexts/translate";

suite("translate context", () => {
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
