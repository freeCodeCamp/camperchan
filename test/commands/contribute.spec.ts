import { assert } from "chai";

import { contribute } from "../../src/commands/contribute";

suite("contribute command", () => {
  test("contribute command is defined", () => {
    assert.isDefined(contribute);
  });

  test("contribute is a command object", () => {
    assert.isDefined(contribute.data);
    assert.isObject(contribute.data);
    assert.isDefined(contribute.run);
    assert.isFunction(contribute.run);
  });

  test("contribute command has correct data", () => {
    assert.equal(contribute.data.name, "contribute");
    assert.equal(
      contribute.data.description,
      "Returns helpful links for folks interested in contributing."
    );
    assert.lengthOf(contribute.data.options, 0);
  });
});
