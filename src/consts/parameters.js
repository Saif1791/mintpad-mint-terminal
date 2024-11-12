import { createThirdwebClient, getContract } from "thirdweb";
/** Change these values to configure the application for your own use. **/
export const client = createThirdwebClient({
    clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
});
// Define ApechainMainnet inline with all required properties
const ApechainMainnet = {
    id: 33139, // Replace with the actual chain ID
    name: "Apechain Mainnet",
    rpc: "https://apechain.calderachain.xyz/http", // Replace with the actual RPC URL
    nativeCurrency: {
        name: "APE",
        symbol: "APE",
        decimals: 18,
    },
    blockExplorer: "https://explorer.apechain.io", // Replace with the actual block explorer URL
};
export const nftContract = getContract({
    // Your smart contract address (available on the thirdweb dashboard)
    address: "0x4844d135A2C1A6c1c4FAc870F0859118641EFdB4",
    // The chain object of the chain your contract is deployed to.
    chain: ApechainMainnet, // Now properly defined
    client,
});
// The block explorer you want to use (Opens when user clicks on history of events. i.e. transfers)
export const blockExplorer = "https://etherscan.io";
