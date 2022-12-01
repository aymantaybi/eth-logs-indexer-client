import { IndexerClient } from "../src";
import { DecodedLog, Filter } from "../src/interfaces";

(async () => {
  const url = "http://0.0.0.0:4000/graphql ";

  const indexerClient = new IndexerClient({ url });

  // indexerClient.initialize({ url });

  const filter: Filter = {
    chainId: 2020,
    address: "0xa8754b9fa15fc18bb59458815510e40a12cd2014",
    jsonInterface: {
      event: {
        anonymous: false,
        name: "Transfer",
        type: "event",
        inputs: [
          {
            indexed: true,
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            name: "value",
            type: "uint256",
          },
        ],
      },
    },
  };

  const transactionHash = "0x7ba085bf4cbccb8eead600206c47ce274b546e1217bb149778fc599fb8419c4d";

  const preview = await indexerClient.logsPreview(filter, transactionHash);

  console.log(JSON.stringify(preview, null, 4));
})();
