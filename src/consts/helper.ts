import { Chain } from "thirdweb";

export const ApechainMainnet: Chain = {
  id: 33139,
  name: "Apechain Mainnet",
  rpc: "https://apechain.calderachain.xyz/http", // Replace with the actual RPC URL
  nativeCurrency: {
    name: "APE",
    symbol: "APE",
    decimals: 18,
  },
};
