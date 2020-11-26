import { Channel, GuildMember, Role, TextChannel } from 'discord.js';

export interface ModerateConfig {
  modRole: Role;
  suspendRole: Role;
  logChannel: TextChannel;
  category?: Channel;
  botRole?: Role;
  targetUser?: GuildMember;
}
