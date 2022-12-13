import { BlockTransactionString } from "web3-eth";
import { Transaction } from "web3-core";
import { AbiItem } from 'web3-utils';

export interface IndexerClientConstructor {
  url: string;
}

export interface MongoDBQuery {
  [key: string]: any;
}

export interface MongoDBQueryOptions extends MongoDBQuery {}

export interface RawLog {
  address: string;
  event: {
    signature: string;
    name: string | undefined;
    inputs: { [key: string]: unknown };
  };
}

export interface DecodedLog extends RawLog {
  function?: RawLog["event"];
  transaction?: Partial<Transaction>;
  block?: Partial<BlockTransactionString>;
  filterId: string;
  logIndex: number;
}

export interface Filter {
  id: string;
  tag?: string;
  chainId?: number;
  address: string;
  jsonInterface: {
    event: AbiItem;
    function?: AbiItem;
  };
  options?: {
    include?: {
      transaction?: boolean | string[];
    };
  };
}
