import { GuildMember, User } from 'discord.js';
import { models } from '../models';
import { User as DbUser } from '../user';
import { updateExistingIdentity } from './update-existing-identity';
import { createNewUser } from './create-new-user';
import { UserLog } from '../user-log';

/**
 * Creates a user-log entry for the given user.
 */
export const createUserLog = async ({
  message,
  user,
  moderator
}: {
  /**
   * The reason the user is suspended.
   */
  message: string;
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
  dbUser: DbUser;
  userLog: UserLog;
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
      : await createNewUser(user);

  const createLog = (): Promise<UserLog> =>
    models.user_logs.create({
      message,
      user: user.id,
      moderator: {
        _id: moderator.id,
        username: moderator.username
      },
      createdAt: new Date()
    });
  const [dbUser, userLog] = await Promise.all([manageUser(), createLog()]);

  return { dbUser, userLog };
};
