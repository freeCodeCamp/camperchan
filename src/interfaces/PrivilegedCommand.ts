import { GuildCommand } from "./GuildCommand";

export interface PrivilegedCommand extends GuildCommand {
  requiredPermissions: bigint[];
}
