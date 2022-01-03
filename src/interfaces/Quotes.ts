export interface Motivation {
  quote: string;
  author: string;
}

export interface QuoteList {
  compliments: Array<string>;
  motivationalQuotes: Array<Motivation>;
}
