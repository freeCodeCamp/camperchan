import type { ExtendedClient } from "./extendedClient.js";
import type { ContextMenuCommandInteraction } from "discord.js";

export interface Context {
  data: {
    name: string;
    type: 2 | 3;
  };
  run: (
    camperChan: ExtendedClient,
    interaction: ContextMenuCommandInteraction
  )=> Promise<void>;
}
