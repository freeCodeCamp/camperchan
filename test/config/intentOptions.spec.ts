import { GatewayIntentBits } from "discord.js";
import { describe, expect, it } from "vitest";
import { intentOptions } from "../../src/config/intentOptions.js";

describe("intentOptions", () => {
  it("all necessary intents should be declared.", () => {
    expect(intentOptions).toContain(GatewayIntentBits.Guilds);
    expect(intentOptions).toContain(GatewayIntentBits.GuildMembers);
    expect(intentOptions).toContain(GatewayIntentBits.GuildModeration);
    expect(intentOptions).toContain(GatewayIntentBits.GuildMessages);
    expect(intentOptions).toContain(GatewayIntentBits.GuildMessageReactions);
    expect(intentOptions).toContain(GatewayIntentBits.MessageContent);
    expect(intentOptions).toContain(GatewayIntentBits.GuildVoiceStates);
  });
});
