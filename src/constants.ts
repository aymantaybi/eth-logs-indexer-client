import { FetchPolicy, gql } from "@apollo/client/core";
import { MutationFetchPolicy } from "@apollo/client/core/watchQueryOptions";

export const defaultOptions: {
  query: {
    fetchPolicy: FetchPolicy;
  };
  mutate: {
    fetchPolicy: MutationFetchPolicy;
  };
} = {
  query: {
    fetchPolicy: "no-cache",
  },
  mutate: {
    fetchPolicy: "no-cache",
  },
};

export const queries = {
  filters: gql`
    query Filters($tags: [String]) {
      filters(tags: $tags) {
        chainId
        address
        tag
        options {
          include {
            transaction
          }
        }
        jsonInterface {
          event {
            anonymous
            constant
            name
            payable
            stateMutability
            type
            gas
          }
          function {
            anonymous
            constant
            name
            payable
            stateMutability
            type
            gas
          }
        }
      }
    }
  `,
  chainId: gql`
    query ChainId {
      chainId
    }
  `,
  logsCounts: gql`
    query LogsCounts($tags: [String!]!) {
      logsCounts(tags: $tags)
    }
  `,
  executeQuery: gql`
    query ExecuteQuery($tag: String, $query: JSONObject, $options: JSONObject) {
      executeQuery(tag: $tag, query: $query, options: $options)
    }
  `,
};

export const mutations = {
  addFilters: gql`
    mutation AddFilters($filters: [FilterInput!]!) {
      addFilters(filters: $filters)
    }
  `,
  removeFilters: gql`
    mutation RemoveFilters($tags: [String!]!) {
      removeFilters(tags: $tags)
    }
  `,
  start: gql`
    mutation Start($blockNumber: Int) {
      start(blockNumber: $blockNumber)
    }
  `,
  stop: gql`
    mutation Stop {
      stop
    }
  `,
};

export const subscriptions = {
  newLogs: gql`
    subscription NewLogs($tags: [String!]!) {
      newLogs(tags: $tags) {
        address
        event {
          inputs
          name
          signature
        }
        filter {
          tag
        }
        function {
          inputs
          name
          signature
        }
        logIndex
        transaction
      }
    }
  `,
};
