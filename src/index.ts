import { HttpLink, split, ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import ws from "ws";
import fetch from "cross-fetch";
import { makeHttpURL, makeWsURL } from "./utils";
import { defaultOptions, queries } from "./constants";

interface IndexerClientConstructor {
  url: string;
}

export class IndexerClient {
  apolloClient: ApolloClient<any>;
  indexerChainId: number | undefined;

  constructor({ url }: IndexerClientConstructor) {
    const httpLink = new HttpLink({
      uri: makeHttpURL(url),
      fetch,
    });

    const wsLink = new GraphQLWsLink(
      createClient({
        url: makeWsURL(url),
        webSocketImpl: ws,
      })
    );

    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
      },
      wsLink,
      httpLink
    );

    this.apolloClient = new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
      defaultOptions,
    });
  }

  async initialize() {
    this.indexerChainId = await this.chainId();
  }

  async chainId() {
    const query = queries.chainId;
    const response = await this.apolloClient.query({ query });
    return response.data.chainId;
  }

  async filters(tags: string[]) {
    const query = queries.filters;
    const variables = { tags };
    const response = await this.apolloClient.query({ query, variables });
    return response.data.filters;
  }
}
