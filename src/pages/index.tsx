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
    "0x4844d135A2C1A6c1c4FAc870F0859118641EFdB4", // Default address
    "0x3f09FC57194809e5a02fACc90dD7021a51819C0D", // New address 1
    "0x2aaab9c978fc1d5c2c452c867e812db3be076626", // New address 2
    "0x7262718ca3734a48c3be93521e8695630f1a45cd" // New address 3
  ]);
  const debouncedSearchTerm = useDebounce(search, 500);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch NFT from a specific contract address
  const fetchNFT = async (nftContractAddress: string) => {
    if (debouncedSearchTerm) {
      const nftContract = getContract({
        address: nftContractAddress,
        chain: ApechainMainnet, // Keep using the ApechainMainnet object
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
            chain: ApechainMainnet, // Keep using the ApechainMainnet object
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
