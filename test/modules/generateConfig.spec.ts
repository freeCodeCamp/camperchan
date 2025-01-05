import { WebhookClient } from "discord.js";
import { describe, expect, it } from "vitest";
import { generateConfig } from "../../src/modules/generateConfig.js";

describe("generateConfig", () => {
  it("is defined", () => {
    expect(generateConfig, "generateConfig is not defined").toBeDefined();
    expect(generateConfig, "generateConfig is not a function").toBeTypeOf("function");
  });

  it("should throw an error on missing environment", () => {
    delete process.env.TOKEN;
    assert.throw(generateConfig, "Missing required config variables");
  });

  it("should return expected object on valid environment", () => {
    process.env.TOKEN = "Naomi";
    process.env.MONGO_URI = "Was";
    process.env.HOME_GUILD = "Here";
    process.env.BOT_ID = "To";
    process.env.REPORT_CHANNEL = "Scream";
    process.env.DEBUG_HOOK
      = `https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    process.env.MOD_HOOK
      = `https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    process.env.MESSAGE_HOOK
      = `https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    process.env.WELCOME_HOOK
      = `https://discord.com/api/webhooks/11111111111111111/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`;
    process.env.GITHUB_TOKEN = "meow";
    process.env.GHOST_KEY = "meow";
    process.env.GITHUB_APP_ID = "1";
    process.env.GITHUB_INSTALLATION_ID = "7";
    const result = generateConfig();
    expect(result.token).toBe(process.env.TOKEN);
    expect(result.mongoUrl).toBe(process.env.MONGO_URI);
    expect(result.homeGuild).toBe(process.env.HOME_GUILD);
    expect(result.botId).toBe(process.env.BOT_ID);
    expect(result.reportChannel).toBe(process.env.REPORT_CHANNEL);
    expect(result.debugHook).toBeInstanceOf(WebhookClient);
    expect(result.modHook).toBeInstanceOf(WebhookClient);
    expect(result.messageHook).toBeInstanceOf(WebhookClient);
    expect(result.welcomeHook).toBeInstanceOf(WebhookClient);
    expect(result.debugHook.url).toBe(process.env.DEBUG_HOOK);
    expect(result.modHook.url).toBe(process.env.MOD_HOOK);
    expect(result.welcomeHook.url).toBe(process.env.WELCOME_HOOK);
    expect(result.githubToken).toBe(process.env.GITHUB_TOKEN);
    expect(result.ghostKey).toBe(process.env.GHOST_KEY);
    assert.equal(result.githubAppId,
      Number.parseInt(process.env.GITHUB_APP_ID, 10));
    expect(result.githubInstallationId).toBe(Number.parseInt(process.env.GITHUB_INSTALLATION_ID, 10),
    );
  });
});
