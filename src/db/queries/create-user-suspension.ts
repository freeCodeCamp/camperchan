import { User, GuildMember } from 'discord.js';
import { models } from '../models';
import { User as DbUser } from '../user';

/**
 * Creates a user-suspension for the given user.
 */
export const createUserSuspension = async ({
  user,
  moderator
}: {
  /**
   * The user who to create a user-suspension for.
   * This function will automatically create a user entry
   * if there isn't one.
   */
  user: GuildMember;
  /**
   * The discord user that created this suspension,
   * which is the moderator, or author of the command.
   */
  moderator: User;
}): Promise<void> => {
  const existingUser = await models.users.findOne({
    _id: user.id
  });

  const dbUser = existingUser
    ? await updateExistingIdentity({
        existingUser,
        user
      })
    : await models.users.create({
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
};

/**
 * Update the existing identity within the existing user.
 */
const updateExistingIdentity = async ({
  existingUser,
  user
}: {
  existingUser: DbUser;
  user: GuildMember;
}): Promise<DbUser> => {
  const existingIdentity = (existingUser?.identities || []).find(
    ({ nickname, username }) =>
      user.nickname === nickname && user.user.username === username
  );
  if (existingIdentity) {
    // if the identity already exists, just return
    return existingUser;
  }
  // otherwise, add a new identity
  existingUser.identities.push({
    nickname: user.nickname || '',
    username: user.user.username,
    createdAt: new Date()
  });
  return existingUser.save();
};
