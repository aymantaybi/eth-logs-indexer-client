export interface IndexerClientConstructor {
  url: string;
}

export interface MongoDBQuery {
  [key: string]: any;
}

export interface MongoDBQueryOptions extends MongoDBQuery {}

export interface DecodedLog {
  address: string;
  logIndex: number;
  filter: {
    tag?: string;
  };
  event: {
    signature: string;
    name: string | undefined;
    inputs: { [key: string]: any };
  };
  function?: {
    signature: string;
    name: string | undefined | null;
    inputs: { [key: string]: any };
  };
  transaction?: {
    hash?: string;
    nonce?: number;
    blockHash?: string;
    blockNumber?: number;
    transactionIndex?: number;
    from?: string;
    to?: string | null;
    value?: string;
    gasPrice?: string;
    maxPriorityFeePerGas?: number | string;
    maxFeePerGas?: number | string;
    gas?: number;
    input?: string;
  };
}

export interface Filter {
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

type AbiType = "function" | "constructor" | "event" | "fallback";
type StateMutabilityType = "pure" | "view" | "nonpayable" | "payable";

interface AbiItem {
  anonymous?: boolean;
  constant?: boolean;
  inputs?: AbiInput[];
  name?: string;
  outputs?: AbiOutput[];
  payable?: boolean;
  stateMutability?: StateMutabilityType;
  type: AbiType;
  gas?: number;
}

interface AbiInput {
  name: string;
  type: string;
  indexed?: boolean;
  components?: AbiInput[];
  internalType?: string;
}

interface AbiOutput {
  name: string;
  type: string;
  components?: AbiOutput[];
  internalType?: string;
}
