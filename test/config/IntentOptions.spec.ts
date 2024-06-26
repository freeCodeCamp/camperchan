import { GatewayIntentBits } from "discord.js";
import { describe, assert, test } from "vitest";

import { IntentOptions } from "../../src/config/IntentOptions.js";

describe("IntentOptions", () => {
  test("All necessary intents should be declared.", () => {
    assert.include(IntentOptions, GatewayIntentBits.Guilds);
    assert.include(IntentOptions, GatewayIntentBits.GuildMembers);
    assert.include(IntentOptions, GatewayIntentBits.GuildModeration);
    assert.include(IntentOptions, GatewayIntentBits.GuildMessages);
    assert.include(IntentOptions, GatewayIntentBits.GuildMessageReactions);
    assert.include(IntentOptions, GatewayIntentBits.MessageContent);
    assert.include(IntentOptions, GatewayIntentBits.GuildVoiceStates);
  });
});
