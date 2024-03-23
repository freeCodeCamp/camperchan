import { assert } from "chai";
import { WebhookClient } from "discord.js";

import { generateConfig } from "../../src/modules/generateConfig";

suite("generateConfig", () => {
  test("is defined", () => {
    assert.isDefined(generateConfig, "generateConfig is not defined");
    assert.isFunction(generateConfig, "generateConfig is not a function");
  });

  test("should throw an error on missing environment", () => {
    delete process.env.TOKEN;
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
    process.env.MESSAGE_HOOK =
      "https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    process.env.WELCOME_HOOK =
      "https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    process.env.GITHUB_TOKEN = "meow";
    process.env.GHOST_KEY = "meow";
    const result = generateConfig();
    assert.equal(result.token, "Naomi");
    assert.equal(result.mongoUrl, "Was");
    assert.equal(result.homeGuild, "Here");
    assert.equal(result.botId, "To");
    assert.equal(result.reportChannel, "Scream");
    assert.instanceOf(result.debugHook, WebhookClient);
    assert.instanceOf(result.modHook, WebhookClient);
    assert.instanceOf(result.messageHook, WebhookClient);
    assert.instanceOf(result.welcomeHook, WebhookClient);
    assert.equal(result.debugHook.url, process.env.DEBUG_HOOK);
    assert.equal(result.modHook.url, process.env.MOD_HOOK);
    assert.equal(result.welcomeHook.url, process.env.WELCOME_HOOK);
    assert.equal(result.githubToken, process.env.GITHUB_TOKEN);
    assert.equal(result.ghostKey, process.env.GHOST_KEY);
  });
});
