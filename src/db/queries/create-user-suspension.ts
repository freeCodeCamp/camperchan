import { GuildMember, User } from 'discord.js';
import { models } from '../models';
import { User as DbUser } from '../user';
import { UserSuspension } from '../user-suspension';

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

/**
 * Creates a user-suspension for the given user.
 */
export const createUserSuspension = async ({
  reason,
  user,
  moderator
}: {
  /**
   * The reason the user is suspended.
   */
  reason: string;
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
}): Promise<{
  /**
   * The user updated/created
   */
  dbUser: DbUser;
  /**
   * The suspension created
   */
  userSuspension: UserSuspension;
}> => {
  const existingUser = await models.users.findOne({
    _id: user.id
  });

  const manageUser = async (): Promise<DbUser> =>
    existingUser
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
  const createSuspension = (): Promise<UserSuspension> =>
    models.user_suspensions.create({
      reason,
      user: user.id,
      moderator: {
        _id: moderator.id,
        username: moderator.username
      },
      createdAt: new Date()
    });

  const [dbUser, userSuspension] = await Promise.all([
    manageUser(),
    createSuspension()
  ]);

  return { dbUser, userSuspension };
};
