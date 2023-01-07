import { IndexerClient } from "../src";

(async () => {
  const url = "http://0.0.0.0:4000/graphql ";

  const indexerClient = new IndexerClient({ url });

  indexerClient.initialize({ url });

  const result = await indexerClient.executeAggregation([
    {
      $match: {
        filterId: "b979edc7-8d17-41e6-a57c-b89bd73f8ca2",
      },
    },
    {
      $group: {
        _id: "$transaction.from",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
  ]);

  console.log({ result });

  /* const indexerFilters = await indexerClient.filters([]);

  console.log(indexerFilters);

  const query = { "transaction.blockNumber": { $gte: 18927621 } };

  const indexerLogs = await indexerClient.executeQuery("100bbe60-6c0a-4d1c-8108-b98891eecc79", query);

  console.log(indexerLogs);

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

  console.log(addedFilters);

  const removedFilters = await indexerClient.removeFilters(addedFilters);

  console.log(removedFilters);

  indexerClient.start();

  setTimeout(() => {
    indexerClient.stop();
  }, 10000); */
})();
