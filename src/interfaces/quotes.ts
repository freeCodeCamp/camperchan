interface Motivation {
  quote:  string;
  author: string;
}

interface QuoteList {
  compliments:        Array<string>;
  motivationalQuotes: Array<Motivation>;
}

export type { Motivation, QuoteList };
