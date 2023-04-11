import { assert } from "chai";

import { truism } from "../../src/commands/truism";

suite("truism command", () => {
  test("truism command is defined", () => {
    assert.isDefined(truism);
  });

  test("truism is a command object", () => {
    assert.isDefined(truism.data);
    assert.isObject(truism.data);
    assert.isDefined(truism.run);
    assert.isFunction(truism.run);
  });

  test("truism command has correct data", () => {
    assert.equal(truism.data.name, "truism");
    assert.equal(
      truism.data.description,
      "Provides a random difficult-to-swallow truth about coding."
    );
    assert.lengthOf(truism.data.options, 0);
  });
});
