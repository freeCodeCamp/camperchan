import { MongoClient } from "mongodb";

import { Camperbot } from "../interfaces/Camperbot";
import { UserRecord } from "../interfaces/UserRecord";

import { errorHandler } from "./errorHandler";

/**
 * Fetches the user's /learn record from the production database.
 *
 * @param {Camperbot} bot The bot's Discord instance.
 * @param {string} email The email to query.
 * @returns {UserRecord | null} The resulting record, or null if error/404.
 */
export const fetchLearnRecord = async (
  bot: Camperbot,
  email: string
): Promise<UserRecord | null> => {
  try {
    const {
      PROD_URI,
      PROD_REPLICA,
      PROD_USER,
      PROD_PASS,
      PROD_DB,
      PROD_COLLECTION,
    } = process.env;
    if (
      !PROD_URI ||
      !PROD_REPLICA ||
      !PROD_USER ||
      !PROD_PASS ||
      !PROD_DB ||
      !PROD_COLLECTION
    ) {
      return null;
    }
    const client = await MongoClient.connect(PROD_URI, {
      replicaSet: PROD_REPLICA,
      auth: {
        username: PROD_USER,
        password: PROD_PASS,
      },
    });
    const db = client.db(PROD_DB);
    const collection = db.collection(PROD_COLLECTION);
    const record = (await collection
      .findOne({ email })
      .catch(() => null)) as UserRecord | null;
    return record;
  } catch (err) {
    await errorHandler(bot, err);
    return null;
  }
};
