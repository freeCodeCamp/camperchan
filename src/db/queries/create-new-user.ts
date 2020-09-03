import { GuildMember } from 'discord.js';
import { models } from '../models';
import { User as DbUser } from '../user';

/**
 * Creates a new user from the guild member.
 * Also saves the first guild-member
 */
export const createNewUser = (user: GuildMember): Promise<DbUser> =>
  models.users.create({
    _id: user.id,
    identities: [
      // create the first entry of identities
      {
        nickname: user.nickname || '',
        username: user.user.username,
        createdAt: new Date()
      }
    ]
  });
