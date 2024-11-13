export interface HashnodeUser {
  user: {
    publications: {
      edges: Array<{
        node: {
          id: string;
        };
      }>;
    };
  } | null;
}
