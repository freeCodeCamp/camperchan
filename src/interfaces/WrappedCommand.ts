import { Command } from "./Command";

export interface WrappedCommand extends Command {
  wrapped: true;
}
