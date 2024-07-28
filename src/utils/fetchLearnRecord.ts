import { MongoClient } from "mongodb";
import { errorHandler } from "./errorHandler.js";
import { logHandler } from "./logHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { UserRecord } from "../interfaces/userRecord.js";

/**
 * Fetches the user's /learn record from the production database.
 * @param camperChan - The camperChan's Discord instance.
 * @param email - The email to query.
 * @param userId - The ID of the Discord user.
 * @returns The resulting record, or null if error/404.
 */
export const fetchLearnRecord = async(
  camperChan: ExtendedClient,
  email: string,
  userId: string,
): Promise<UserRecord | null> => {
  try {
    const cached = camperChan.learnAccounts[userId];
    if (cached && cached.cacheTTL.getTime() < Date.now()) {
      // Arbitrary key validation to ensure cached value is a record, and not just a ttl object.
      return "isDonating" in cached
        ? cached
        : null;
    }
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete camperChan.learnAccounts[userId];
    const {
      PROD_URI: productionUri,
      PROD_REPLICA: productionReplica,
      PROD_USER: productionUser,
      PROD_PASS: productionPassword,
      PROD_DB: productionDatabase,
      PROD_COLLECTION: productionCollection,
    } = process.env;
    if (
      productionUri === undefined
      || productionReplica === undefined
      || productionUser === undefined
      || productionPassword === undefined
      || productionDatabase === undefined
      || productionCollection === undefined
    ) {
      const missing = [
        "PROD_URI",
        "PROD_REPLICA",
        "PROD_USER",
        "PROD_PASS",
        "PROD_DB",
        "PROD_COLLECTION",
      ].filter((s) => {
        return process.env[s] === undefined;
      });
      logHandler.log(
        "error",
        `Missing following environment variables. ${missing.join(", ")}`,
      );
      return null;
    }
    const client = await MongoClient.connect(productionUri, {
      auth: {
        password: productionPassword,
        username: productionUser,
      },
      replicaSet: productionReplica,
    });
    const database = client.db(productionDatabase);
    const collection = database.collection<UserRecord>(productionCollection);
    const record = await collection.findOne({ email }).
      catch(async(error: unknown) => {
        await errorHandler(camperChan, "fetch learn record db query", error);
        return null;
      });
    const oneDay = 1000 * 60 * 60 * 24;
    const cacheTTL = new Date(Date.now() + oneDay);
    if (!camperChan.learnAccounts[userId]) {
      camperChan.learnAccounts[userId] = record
        ? { ...record, cacheTTL }
        : {
          cacheTTL,
          email,
        };
    }
    return record;
  } catch (error) {
    await errorHandler(camperChan, "fetch learn record module", error);
    return null;
  }
};
