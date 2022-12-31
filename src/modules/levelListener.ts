import { Message } from "discord.js";

import levelScale from "../config/levelScale";
import LevelModel from "../database/models/LevelModel";
import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

/**
 * Processes level data for a user.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {Message} message The message payload from Discord.
 */
export const levelListener = async (Bot: Camperbot, message: Message) => {
  try {
    const { author, content } = message;

    if (author.bot) {
      return;
    }

    const bonus = Math.floor(content.length / 10);
    const pointsEarned = Math.floor(Math.random() * (20 + bonus)) + 5;
    const user =
      (await LevelModel.findOne({ userId: author.id })) ||
      (await LevelModel.create({
        userID: author.id,
        userTag: author.tag,
        points: 0,
        level: 0,
        lastSeen: new Date(Date.now()),
        cooldown: 0,
      }));

    if (Date.now() - user.cooldown < 60000 || user.level >= 100) {
      return;
    }

    user.points += pointsEarned;
    user.lastSeen = new Date(Date.now());
    user.userTag = author.tag;
    user.cooldown = Date.now();
    let levelUp = false;

    while (user.points > levelScale[user.level + 1]) {
      user.level++;
      levelUp = true;
    }

    await user.save();

    if (levelUp) {
      await message.reply({
        content: `Congrats~! You are now level ${user.level}!!!`,
      });
    }
  } catch (err) {
    await errorHandler(Bot, err);
  }
};
