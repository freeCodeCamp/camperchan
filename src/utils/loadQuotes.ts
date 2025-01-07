import { errorHandler } from "./errorHandler.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";
import type { QuoteList } from "../interfaces/quotes.js";

/**
 * Fetches quote data from the freeCodeCamp repository.
 * @param camperChan - The camperChan's Discord instance.
 * @returns The quote data.
 */
export const loadQuotes
= async(camperChan: ExtendedClient): Promise<QuoteList> => {
  try {
    const quoteFetch = await fetch(
      `https://raw.githubusercontent.com/freeCodeCamp/freeCodeCamp/main/client/i18n/locales/english/motivation.json`,
    );
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- It kills me that .json() doesn't take a generic.
    const quoteData = (await quoteFetch.json()) as QuoteList;
    return quoteData;
  } catch (error) {
    await errorHandler(camperChan, "load quotes module", error);
    return {
      compliments:        [ "No data found!" ],
      motivationalQuotes: [
        {
          author: "No data found!",
          quote:  "No data found!",
        },
      ],
    };
  }
};
