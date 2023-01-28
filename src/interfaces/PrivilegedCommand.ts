import { GuildCommand } from "./GuildCommand";

/**
 * A command that requires certain permissions to be executed.
 *
 * When a command is registered as a PrivilegedCommand, it will be wrapped such
 * that it can only be executed by an entity with *all* of the permissions
 * enumerated within the requiredPermissions property.
 *
 * If the calling entity lacks permission to execute the command, it will
 * respond back with an error message and the run() method on the
 * PrivilegedCommand will not be executed.
 *
 * PrivilegedCommands are also GuildCommands as permissions are attached to
 * guilds.
 */
export interface PrivilegedCommand extends GuildCommand {
  requiredPermissions: bigint[];
}
