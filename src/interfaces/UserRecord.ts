/**
 * Only tracks the properties that Camperbot actually needs.
 */
export interface UserRecord {
  email: string;
  isDonating?: boolean;
}
