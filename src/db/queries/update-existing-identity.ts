import { User } from '../user';
import { GuildMember } from 'discord.js';
/**
 * Update the existing identity within the existing user.
 */
export const updateExistingIdentity = async ({
  existingUser,
  user
}: {
  existingUser: User;
  user: GuildMember;
}): Promise<User> => {
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
