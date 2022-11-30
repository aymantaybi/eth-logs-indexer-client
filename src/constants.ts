import { FetchPolicy, gql } from "@apollo/client";
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
};
