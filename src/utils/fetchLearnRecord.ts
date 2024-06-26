import { MongoClient } from "mongodb";

import { ExtendedClient } from "../interfaces/ExtendedClient.js";
import { UserRecord } from "../interfaces/UserRecord.js";

import { errorHandler } from "./errorHandler.js";
import { logHandler } from "./logHandler.js";

/**
 * Fetches the user's /learn record from the production database.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {string} email The email to query.
 * @param {string} userId The ID of the Discord user.
 * @returns {UserRecord | null} The resulting record, or null if error/404.
 */
export const fetchLearnRecord = async (
  CamperChan: ExtendedClient,
  email: string,
  userId: string
): Promise<UserRecord | null> => {
  try {
    const cached = CamperChan.learnAccounts[userId];
    if (cached && cached.cacheTTL.getTime() < Date.now()) {
      // Arbitrary key validation to ensure cached value is a record, and not just a ttl object.
      return "isDonating" in cached ? cached : null;
    }
    delete CamperChan.learnAccounts[userId];
    const {
      PROD_URI,
      PROD_REPLICA,
      PROD_USER,
      PROD_PASS,
      PROD_DB,
      PROD_COLLECTION
    } = process.env;
    if (
      !PROD_URI ||
      !PROD_REPLICA ||
      !PROD_USER ||
      !PROD_PASS ||
      !PROD_DB ||
      !PROD_COLLECTION
    ) {
      const missing = [
        "PROD_URI",
        "PROD_REPLICA",
        "PROD_USER",
        "PROD_PASS",
        "PROD_DB",
        "PROD_COLLECTION"
      ].filter((s) => !process.env[s]);
      logHandler.log(
        "error",
        `Missing following environment variables. ${missing.join(", ")}`
      );
      return null;
    }
    const client = await MongoClient.connect(PROD_URI, {
      replicaSet: PROD_REPLICA,
      auth: {
        username: PROD_USER,
        password: PROD_PASS
      }
    });
    const db = client.db(PROD_DB);
    const collection = db.collection(PROD_COLLECTION);
    const record = (await collection.findOne({ email }).catch(async (err) => {
      await errorHandler(CamperChan, "fetch learn record db query", err);
      return null;
    })) as UserRecord | null;
    const cacheTTL = new Date(Date.now() + 1000 * 60 * 60 * 24);
    if (!CamperChan.learnAccounts[userId]) {
      CamperChan.learnAccounts[userId] = record
        ? { ...record, cacheTTL }
        : {
            email,
            cacheTTL
          };
    }
    return record;
  } catch (err) {
    await errorHandler(CamperChan, "fetch learn record module", err);
    return null;
  }
};
