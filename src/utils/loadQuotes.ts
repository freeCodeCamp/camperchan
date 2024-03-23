import { Camperbot } from "../interfaces/Camperbot";
import { QuoteList } from "../interfaces/Quotes";

import { errorHandler } from "./errorHandler";

/**
 * Fetches quote data from the freeCodeCamp repository.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @returns {QuoteList} The quote data.
 */
export const loadQuotes = async (Bot: Camperbot) => {
  try {
    const quoteFetch = await fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/freeCodeCamp/main/client/i18n/locales/english/motivation.json"
    );
    const quoteData = (await quoteFetch.json()) as QuoteList;
    return quoteData;
  } catch (err) {
    await errorHandler(Bot, "load quotes module", err);
    return {
      compliments: ["No data found!"],
      motivationalQuotes: [
        {
          quote: "No data found!",
          author: "No data found!"
        }
      ]
    };
  }
};
