import { Command } from "./Command";

/**
 * A wrapped version of a command.
 *
 * This type is used to signal that a Command has been properly
 * wrapped and is safe to register. It is used to prevent the
 * accidental registration of unwrapped commands.
 *
 * Never directly declare a command as Wrapped without.
 */
export interface WrappedCommand extends Command {
  wrapped: true;
}
