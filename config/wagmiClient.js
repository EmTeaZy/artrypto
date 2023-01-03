import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import React from "react";
const chains = [goerli];
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "41ec82adeed50123dc362ab0751c5b4f" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "Artrypto", chains }),
  provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);


export default wagmiClient;
