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
    query Filters($ids: [String]) {
      filters(ids: $ids)
    }
  `,
  chainId: gql`
    query ChainId {
      chainId
    }
  `,
  logsCounts: gql`
    query LogsCounts($ids: [String!]!) {
      logsCounts(ids: $ids)
    }
  `,
  executeQuery: gql`
    query ExecuteQuery($id: String, $query: JSONObject, $options: JSONObject) {
      executeQuery(id: $id, query: $query, options: $options)
    }
  `,
  logsPreview: gql`
    query LogsPreview($filter: FilterInput, $transactionHash: String) {
      logsPreview(transactionHash: $transactionHash, filter: $filter)
    }
  `,
  status: gql`
    query Status {
      status
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
    mutation RemoveFilters($ids: [String!]!) {
      removeFilters(ids: $ids)
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
    subscription NewLogs($ids: [String!]!) {
      newLogs(ids: $ids) {
        address
        filterId
        event {
          inputs
          name
          signature
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
  statusUpdate: gql`
    subscription StatusUpdate {
      statusUpdate
    }
  `,
};
