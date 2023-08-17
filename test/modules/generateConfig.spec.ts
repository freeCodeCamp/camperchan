import { assert } from "chai";
import { WebhookClient } from "discord.js";

import { generateConfig } from "../../src/modules/generateConfig";

suite("generateConfig", () => {
  test("is defined", () => {
    assert.isDefined(generateConfig, "generateConfig is not defined");
    assert.isFunction(generateConfig, "generateConfig is not a function");
  });

  test("should throw an error on missing environment", () => {
    assert.throw(generateConfig, "Missing required config variables");
  });

  test("should return expected object on valid environment", () => {
    process.env.TOKEN = "Naomi";
    process.env.MONGO_URI = "Was";
    process.env.HOME_GUILD = "Here";
    process.env.BOT_ID = "To";
    process.env.REPORT_CHANNEL = "Scream";
    process.env.DEBUG_HOOK =
      "https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    process.env.MOD_HOOK =
      "https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    process.env.WELCOME_HOOK =
      "https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    process.env.GITHUB_TOKEN = "meow";
    const result = generateConfig();
    assert.equal(result.token, "Naomi");
    assert.equal(result.mongo_uri, "Was");
    assert.equal(result.home_guild, "Here");
    assert.equal(result.bot_id, "To");
    assert.equal(result.report_channel, "Scream");
    assert.instanceOf(result.debug_hook, WebhookClient);
    assert.instanceOf(result.mod_hook, WebhookClient);
    assert.instanceOf(result.welcome_hook, WebhookClient);
    assert.equal(result.debug_hook.url, process.env.DEBUG_HOOK);
    assert.equal(result.mod_hook.url, process.env.MOD_HOOK);
    assert.equal(result.welcome_hook.url, process.env.WELCOME_HOOK);
    assert.equal(result.githubToken, process.env.GITHUB_TOKEN);
  });
});
