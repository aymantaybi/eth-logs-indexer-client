import { IndexerClient } from "../src";
import { DecodedLog } from "../src/interfaces";

(async () => {
  const url = "http://0.0.0.0:4000/graphql ";

  const indexerClient = new IndexerClient({ url });

  // indexerClient.initialize({ url });

  const addedFilters = await indexerClient.addFilters([
    {
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
    },
  ]);

  const observer = await indexerClient.newLogs(addedFilters);

  const transfers: any[] = [];

  const subscription = observer.subscribe(({ data }) => {
    const newTransfers = data.newLogs.map((log: DecodedLog) => log.event.inputs);
    transfers.push(...newTransfers);
    console.log(newTransfers);
  });

  /*  setTimeout(() => {
    subscription.unsubscribe();
  }, 10000); */
})();
