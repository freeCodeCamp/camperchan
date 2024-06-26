import { ContextMenuCommandInteraction } from "discord.js";

import { ExtendedClient } from "./ExtendedClient.js";

export interface Context {
  data: {
    name: string;
    type: 2 | 3;
  };
  run: (
    CamperChan: ExtendedClient,
    interaction: ContextMenuCommandInteraction
  ) => Promise<void>;
}
