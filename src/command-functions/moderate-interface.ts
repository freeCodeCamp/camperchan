import { GuildChannel, GuildMember, Role, TextChannel } from 'discord.js';

export interface ModerateConfig {
  modRole: Role;
  logChannel: TextChannel;
  category?: GuildChannel;
  botId: string;
  targetUser?: GuildMember;
}
