interface Icon {
    url: string;
    width: number;
    height: number;
    format: string;
}

interface NativeCurrency {
    name: string;
    symbol: string;
    decimals: number;
}

interface Explorer {
    name: string;
    url: string;
    standard: string;
}

interface Chain {
    id: number; // Ensure id is defined in the Chain interface
    name: string;
    chain: string;
    status: string;
    icon: Icon;
    rpc: string; // Change this to string
    ws: string[];
    faucets: string[];
    nativeCurrency: NativeCurrency;
    infoURL: string;
    shortName: string;
    chainId: number;
    networkId: number;
    explorers: Explorer[];
    testnet: boolean;
    slug: string;
}

// Define the ApechainMainnet constant with the correct type
export const ApechainMainnet: Chain = {
    id: 33139, // Add this line
    name: "ApeChain Mainnet",
    chain: "APE",
    status: "active",
    icon: {
        url: "ipfs://QmexB2NLdsFD5HytT5WRhgm5r75Qzr9DAzAuSvfkfojZDE",
        width: 100,
        height: 100,
        format: "png"
    },
    rpc: "https://apechain.calderachain.xyz/http", // Change this to a single string
    ws: [
        "wss://apechain.calderachain.xyz/ws"
    ],
    faucets: [],
    nativeCurrency: {
        name: "Ape Token",
        symbol: "APE",
        decimals: 18
    },
    infoURL: "https://apescan.io/",
    shortName: "ape-mainnet",
    chainId: 33139,
    networkId: 33139,
    explorers: [
        {
            name: "ApeChain Explorer",
            url: "https://apescan.io",
            standard: "EIP3091"
        }
    ],
    testnet: false,
    slug: "apechain-mainnet"
};
