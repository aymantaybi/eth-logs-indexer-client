import { IndexerClient } from "../src";

(async () => {
  const url = "http://0.0.0.0:4000/graphql ";

  const indexerClient = new IndexerClient({ url });

  await indexerClient.initialize();

  console.log(indexerClient.chainId);
})();
