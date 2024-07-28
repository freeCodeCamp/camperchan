import { levelScale } from "../config/levelScale.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { Message } from "discord.js";

/**
 * Processes level data for a user.
 * @param camperChan - The camperChan's Discord instance.
 * @param message - The message payload from Discord.
 */
export const levelListener = async(
  camperChan: ExtendedClient,
  message: Message,
): Promise<void> => {
  try {
    const { author, content } = message;

    if (author.bot) {
      return;
    }

    const bonus = Math.floor(content.length / 10);
    const pointsEarned = Math.floor(Math.random() * (20 + bonus)) + 5;
    const user = await camperChan.db.levels.upsert({
      create: {
        cooldown:    0,
        lastSeen:    new Date(Date.now()),
        level:       0,
        levelAlerts: true,
        points:      0,
        userId:      author.id,
        userTag:     author.tag,
      },
      update: {},
      where:  {
        userId: author.id,
      },
    });

    if (Date.now() - user.cooldown < 60_000 || user.level >= 1000) {
      return;
    }

    user.points = user.points + pointsEarned;
    user.lastSeen = new Date(Date.now());
    user.userTag = author.tag;
    user.cooldown = Date.now();
    let levelUp = false;

    while (user.points > (levelScale[user.level + 1] ?? 505_000)) {
      user.level = user.level + 1;
      levelUp = true;
    }

    await camperChan.db.levels.update({
      data: {
        cooldown:    user.cooldown,
        lastSeen:    user.lastSeen,
        level:       user.level,
        levelAlerts: user.levelAlerts,
        points:      user.points,
        userTag:     user.userTag,
      },
      where: {
        userId: author.id,
      },
    });

    if (levelUp && user.levelAlerts) {
      await message.reply({
        content: `Congrats~! You are now level ${String(user.level)}!!!\nDon't want these messages anymore? You can turn them off in your </user-settings:1214364031012442163>`,
      });
    }
  } catch (error) {
    await errorHandler(camperChan, "level listener module", error);
  }
};
