declare module "graphql-request" {
  type GraphQLQuery =
    | `query ${string}`
    | `mutation ${string}`
    | `subscription ${string}`;
  declare const gql: (
    template: TemplateStringsArray,
    ...expressions: Array<unknown>
  )=> GraphQLQuery;
  declare function request<T = unknown>(
    url: string,
    query: GraphQLQuery,
    variables?: Record<string, unknown>
  ): Promise<T>;
}
