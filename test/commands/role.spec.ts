import { assert } from "chai";
import { ApplicationCommandOptionType } from "discord.js";

import { role } from "../../src/commands/role";

suite("role command", () => {
  test("role command is defined", () => {
    assert.isDefined(role);
  });

  test("role is a command object", () => {
    assert.isDefined(role.data);
    assert.isObject(role.data);
    assert.isDefined(role.run);
    assert.isFunction(role.run);
  });

  test("role command has correct data", () => {
    assert.equal(role.data.name, "role");
    assert.equal(
      role.data.description,
      "Creates a post with buttons for self-assignable roles."
    );
    assert.lengthOf(role.data.options, 22);
    const channelOption = role.data.options[0].toJSON();
    const headerOption = role.data.options[1].toJSON();
    const firstRoleOption = role.data.options[2].toJSON();
    const roleOptions = role.data.options.slice(3).map((el) => el.toJSON());
    assert.equal(channelOption.name, "channel");
    assert.equal(channelOption.description, "Channel to create the post in.");
    assert.equal(channelOption.type, ApplicationCommandOptionType.Channel);
    assert.isTrue(channelOption.required);
    assert.equal(headerOption.name, "header");
    assert.equal(
      headerOption.description,
      "Text to include at the top of the post."
    );
    assert.equal(headerOption.type, ApplicationCommandOptionType.String);
    assert.isTrue(headerOption.required);
    assert.equal(firstRoleOption.name, "role1");
    assert.equal(firstRoleOption.description, "Role to create a button for.");
    assert.equal(firstRoleOption.type, ApplicationCommandOptionType.Role);
    assert.isTrue(firstRoleOption.required);
    roleOptions.forEach((roleOption, index) => {
      assert.equal(roleOption.name, `role${index + 2}`);
      assert.equal(roleOption.description, `Role to create a button for.`);
      assert.equal(roleOption.type, ApplicationCommandOptionType.Role);
      assert.isFalse(roleOption.required);
    });
  });
});
