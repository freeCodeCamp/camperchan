import { ContextMenuCommandInteraction } from "discord.js";

import { ExtendedClient } from "./ExtendedClient";

export interface Context {
  data: {
    name: string;
    type: 2 | 3;
  };
  run: (
    Bot: ExtendedClient,
    interaction: ContextMenuCommandInteraction
  ) => Promise<void>;
}
