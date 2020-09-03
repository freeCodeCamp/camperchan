import { GuildMember } from 'discord.js';
import { models } from '../models';
import { User as DbUser } from '../user';
import { UserLog } from '../user-log';
import { UserSuspension } from '../user-suspension';

export type UserLogEntry = UserLog | UserSuspension;

export enum GetUserEntriesFilter {
  LOGS = 'logs',
  SUSPENSIONS = 'suspensions',
  ALL = 'all'
}

/**
 * Returns the list of user-entries for the given user, if
 * there are any.
 */
export const getUserEntries = async ({
  user,
  filter
}: {
  /**
   * The user to load logs for
   */
  user: GuildMember;
  /**
   * What to search for
   *
   * **note** might want to rename this property
   */
  filter: GetUserEntriesFilter;
}): Promise<{
  dbUser: DbUser | undefined;
  entries: Array<UserLogEntry>;
}> => {
  const existingUser = await models.users.findOne({
    _id: user.id
  });
  if (!existingUser) {
    // if no user exists, just return empty
    return {
      dbUser: undefined,
      entries: []
    };
  }
  const [logs, suspensions] = await Promise.all([
    filter.includes(GetUserEntriesFilter.ALL) ||
    filter.includes(GetUserEntriesFilter.LOGS)
      ? models.user_logs.find({
          user: user.id
        })
      : Promise.resolve([]),
    filter.includes(GetUserEntriesFilter.ALL) ||
    filter.includes(GetUserEntriesFilter.SUSPENSIONS)
      ? models.user_suspensions.find({
          user: user.id
        })
      : Promise.resolve([])
  ]);

  return {
    dbUser: existingUser,
    // sort the entries
    entries: [...logs, ...suspensions].sort(
      ({ createdAt: createdAtA }, { createdAt: createdAtB }) =>
        createdAtA.getTime() - createdAtB.getTime()
    )
  };
};
