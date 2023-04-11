import { assert } from "chai";

import { Tags } from "../../src/config/Tags";

suite("Tags", () => {
  for (const tag of Tags) {
    test(`${tag.name} should be formatted correctly.`, () => {
      assert.notMatch(tag.name, /\s/, "Name contains blankspace characters.");
      assert.notMatch(
        tag.name,
        /[^a-zA-Z0-9-]/,
        "Name contains invalid characters."
      );
      assert.isAtMost(
        tag.message.length,
        4000,
        "Message exceeds Discord limits."
      );
      for (const alias of tag.aliases) {
        assert.notMatch(
          alias,
          /\s/,
          `Alias ${alias} contains blankspace characters.`
        );
        assert.notMatch(
          alias,
          /[^a-zA-Z0-9-]/,
          `Alias ${alias} contains invalid characters.`
        );
        assert.equal(
          tag.aliases.indexOf(alias),
          tag.aliases.lastIndexOf(alias),
          `Alias ${alias} is not unique.`
        );
      }
    });
  }
});
