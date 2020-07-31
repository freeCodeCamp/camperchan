export interface MotivationalDef {
  quote: string;
  author: string;
}

export interface QuoteDef {
  compliments: Array<string>;
  motivationalQuotes: Array<MotivationalDef>;
}
