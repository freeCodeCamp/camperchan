declare module "@tryghost/admin-api" {

  /**
   * Barebones type-def to work with our codebase.
   */
  // eslint-disable-next-line import/no-default-export
  export default class GhostAdminApi {
    public users: {
      // eslint-disable-next-line @typescript-eslint/method-signature-style
      browse(options: { filter: string }):
      Promise<Array<Record<string, string>>>;
    };

    /**
     * @param key - The ADMIN api key for your Ghost instance.
     * @param url - The base URL for your ghost instance.
     * @param version - The version of ghost you are running.
     */
    public constructor(config: {
      key:     string;
      url:     string;
      version: string;
    });
  }
}
