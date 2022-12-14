import { HttpLink, split, ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client/core";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import ws from "ws";
import fetch from "cross-fetch";
import { makeHttpURL, makeWsURL } from "./utils";
import { defaultOptions, queries, mutations, subscriptions } from "./constants";
import { IndexerClientConstructor, MongoDBQuery, MongoDBQueryOptions, Filter, DecodedLog } from "./interfaces";

export class IndexerClient {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  endpoint: string;

  constructor({ url }: IndexerClientConstructor) {
    this.endpoint = url;
    this.apolloClient = this.createApolloClient(url);
  }

  initialize({ url }: { url: string }) {
    this.endpoint = url;
    this.apolloClient = this.createApolloClient(url);
  }

  private createApolloClient(url: string) {
    const httpLink = new HttpLink({
      uri: makeHttpURL(url),
      fetch,
    });

    const wsLink = new GraphQLWsLink(
      createClient({
        url: makeWsURL(url),
        webSocketImpl: typeof window !== "undefined" ? undefined : ws,
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

    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
      defaultOptions,
    });
  }

  async chainId(): Promise<number> {
    const query = queries.chainId;
    const response = await this.apolloClient.query({ query });
    return response.data.chainId;
  }

  async filters(ids: string[]): Promise<Filter[]> {
    const query = queries.filters;
    const variables = { ids };
    const response = await this.apolloClient.query({ query, variables });
    return response.data.filters;
  }

  async logsCounts(ids: string[]): Promise<number[]> {
    const query = queries.logsCounts;
    const variables = { ids };
    const response = await this.apolloClient.query({ query, variables });
    return response.data.logsCounts;
  }

  async executeQuery(query: MongoDBQuery = {}, options: MongoDBQueryOptions = {}): Promise<DecodedLog[]> {
    const variables = { query, options };
    const response = await this.apolloClient.query({ query: queries.executeQuery, variables });
    return response.data.executeQuery;
  }

  async executeAggregation(pipeline: any = [], options: any = {}): Promise<any> {
    const variables = { pipeline, options };
    const response = await this.apolloClient.query({ query: queries.executeAggregation, variables });
    return response.data.executeAggregation;
  }

  async logsPreview(filter: Filter, transactionHash: string) {
    const query = queries.logsPreview;
    const variables = { filter, transactionHash };
    const response = await this.apolloClient.query({ query, variables });
    return response.data.logsPreview;
  }

  async status() {
    const query = queries.status;
    const response = await this.apolloClient.query({ query });
    return response.data.status;
  }

  async addFilters(filters: Filter[]): Promise<string[]> {
    const mutation = mutations.addFilters;
    const variables = { filters };
    const response = await this.apolloClient.mutate({ mutation, variables });
    return response.data.addFilters;
  }

  async removeFilters(ids: string[]): Promise<string[]> {
    const mutation = mutations.removeFilters;
    const variables = { ids };
    const response = await this.apolloClient.mutate({ mutation, variables });
    return response.data.removeFilters;
  }

  async start(blockNumber?: number): Promise<Boolean> {
    const mutation = mutations.start;
    const variables = { blockNumber };
    const response = await this.apolloClient.mutate({ mutation, variables });
    return response.data.start;
  }

  async stop(): Promise<Boolean> {
    const mutation = mutations.stop;
    const response = await this.apolloClient.mutate({ mutation });
    return response.data.stop;
  }

  async newLogs(ids: string[]) {
    const query = subscriptions.newLogs;
    const variables = { ids };
    return this.apolloClient.subscribe({ query, variables });
  }

  async statusUpdate() {
    const query = subscriptions.statusUpdate;
    return this.apolloClient.subscribe({ query });
  }
}
