import { Footer } from "@/components/Nav/Footer";
import { Header } from "@/components/Nav/Header";
import { NFTCard } from "@/components/NFTCard";
import { createThirdwebClient, getContract } from "thirdweb";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { NFT } from "thirdweb";
import { getNFT } from "thirdweb/extensions/erc721";
import { ApechainMainnet } from "../consts/helper"; // Your custom chain definition

// Create a thirdweb client
export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_TEMPLATE_CLIENT_ID,
});

function App() {
  const [search, setSearch] = useState<string>("");
  const [nftContractAddresses, setNftContractAddresses] = useState([
    "0x854A37EE79CAe6D88e2C9F4416655a07de52dA9F",
    "0x9215D56dD2713768dcfB70d56106719Ab17A62eB",
    "0x13B93011601CeAe9C185FB73E810F1883F22d52B",
    "0x3F917E61474d3244C4A80DA06B78AD26d01960D0",
    "0xB81e976D777F90527621d52bA13C31C1A056d62F",
    "0x9ba7f5dD99a8ADB2ac89fd9b2874d46A01A2cC9e",
    "0x818BdE5F8eB646ffF1F0847EAbee325a75342e82",
    "0x0C1269D7e5586bb948816202772CA9b781965eCc",
    "0x8CCDc2a12201550fe2F4Ffc355Ed0a240750E6eC",
    "0x9e8d745ae5AFe93A196A082Cd98735B4A225A518",
    "0xf386517B27D9eDA3FA09Aac3566d31F5A2034D2D",
    "0xc82AE029e40801C1Aac36005127e8111129a72aA",
    "0x2176CD1d4ceB3Ede7d62D3CdDfD7bACc2cA2FBa7",
    "0xDD25972b12B388B5D19Df6d3e9Cb639126ef7Bf1",
    "0xba14BBed9B4D64BFb751b46C582C8A9F8602E85C",
    "0x76E848B248911B9c60D39bE6120bC08257Bf787a",
    "0x5A6901de73349D22075b0EC0573dACe228b09F54",
    "0xd6d8ca925f23b07Be350D6E53E9f1adC42cCC1F3",
    "0x1Ed81c0A9f972E6d37b6c144a3c327c3C8a7E099",
    "0xB3A95e761b782268B76b931F948fe36FE91190e6",
    "0x897Afa3e39AFa39CA4E59D9cB787Ba977056C324",
    "0x398EE4dD8b11290590178fA0a84FF082f6642A4A",
    "0xB81bBACe40b083D8f29aaff603D0821E7152a91a",
    "0x3247740fD6c8eC6C354E2C6742bBCCFb291B19d5",
    "0x52ed3330602e497C1872e5d6D2A2557cb94059c1",
    "0x6843208f06CFDc9B66d92e29E03e05cC4c63A832",
    "0x15634499FBeb853a890f6e480E18D62BA21d49c4",
    "0xeF3C010e3E5A25b2e8AB0f875c1B6bb9329Abe55",
    "0xB91447C9a86Cc17729E3C4E78AB9Cf7825eCeED2",
    "0x501baC0031772E7d37a638A729677d6bf8Dc7431"
  ]);
  const debouncedSearchTerm = useDebounce(search, 500);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch NFT from a specific contract address
  const fetchNFT = async (nftContractAddress: string) => {
    if (debouncedSearchTerm) {
      const nftContract = getContract({
        address: nftContractAddress,
        chain: ApechainMainnet,
        client,
      });

      const nft = await getNFT({
        contract: nftContract,
        tokenId: BigInt(debouncedSearchTerm),
      });

      return nft;
    }
    return null;
  };

  const fetchNFTs = async () => {
    setIsSearching(true);
    const fetchedNFTs = await Promise.all(
      nftContractAddresses.map(async (address) => {
        const nft = await fetchNFT(address);
        return nft;
      })
    );
    setNfts(fetchedNFTs.filter((nft) => nft !== null));
    setIsSearching(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchNFTs();
    } else {
      setNfts([]);
    }
  }, [debouncedSearchTerm, nftContractAddresses]);

  // Fetch NFTs with token ID 0 on component mount for all contracts
  useEffect(() => {
    const fetchTokenZeroNFTs = async () => {
      const zeroNFTs = await Promise.all(
        nftContractAddresses.map(async (address) => {
          const nftContract = getContract({
            address,
            chain: ApechainMainnet,
            client,
          });

          const nftZero = await getNFT({
            contract: nftContract,
            tokenId: BigInt(0),
          });
          return nftZero;
        })
      );
      setNfts(zeroNFTs.filter((nft) => nft !== null));
    };

    fetchTokenZeroNFTs();
  }, [nftContractAddresses]);

  // Handle NFT click and redirect to Magic Eden
  const handleNFTClick = (address: string) => {
    window.open(`https://magiceden.io/collections/apechain/${address}`, '_blank'); // Open in new tab
  };

  return (
    <div className="m-0 bg-[#0A0A0A] p-0 font-inter text-neutral-200">
      <Header />

      <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Mintpad Mint Terminal
        </h1>

        {isSearching ? (
          <div className="mx-auto !h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
        ) : null}

        {/* Display NFTs in a horizontal layout */}
        <div className="flex flex-wrap space-x-4">
          {nfts.map((nft, index) => (
            <div key={nft.id.toString()} className="cursor-pointer">
              {/* Pass the contract address to the NFTCard's onClick */}
              <NFTCard 
                nft={nft} 
                onClick={() => handleNFTClick(nftContractAddresses[index])} // Attach click handler
              />
            </div>
          ))}
        </div>
      </div>

      <Footer
        page={0}
        setPage={function (page: number): void {
          throw new Error("Function not implemented.");
        }}
        nftsPerPage={0}
        totalCount={undefined}
        loading={false}
      />
    </div>
  );
}

export default App;
