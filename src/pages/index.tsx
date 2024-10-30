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

// Define a type for NFT collection
type NftCollection = {
  name: string;
  permalink: string;
  address: string;
};

function App() {
  const [search, setSearch] = useState<string>("");
  const [nftCollections, setNftCollections] = useState<NftCollection[]>([]);
  const debouncedSearchTerm = useDebounce(search, 500);
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Step 1: Fetch NFT collections from API
  const fetchNftCollections = async () => {
    try {
      const response = await fetch("https://app.mintpad.co/getdatacollection");
      const data = await response.json();
      const collections = data.map((item: any) => ({
        name: item.name,
        permalink: item.permalink,
        address: item.address,
      }));
      setNftCollections(collections);
      console.log("Fetched collections:", collections); // Confirm collections
    } catch (error) {
      console.error("Error fetching NFT collections:", error);
    }
  };

  useEffect(() => {
    fetchNftCollections(); // Fetch collections on component mount
  }, []);

  // Step 2: Fetch NFTs from each contract based on search term
  const fetchNFT = async (nftContractAddress: string) => {
    if (!debouncedSearchTerm) return null; // Skip if no search term
    try {
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
    } catch (error) {
      console.error(`Error fetching NFT for ${nftContractAddress}:`, error);
      return null;
    }
  };

  const fetchNFTs = async () => {
    setIsSearching(true);
    const fetchedNFTs = await Promise.all(
      nftCollections.map(async (collection) => {
        const nft = await fetchNFT(collection.address);
        return nft;
      })
    );
    setNfts(fetchedNFTs.filter((nft) => nft !== null) as NFT[]);
    setIsSearching(false);
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchNFTs();
    } else {
      setNfts([]);
    }
  }, [debouncedSearchTerm, nftCollections]);

  // Step 3: Fetch NFTs with Token ID 0 on component mount for all contracts
  useEffect(() => {
    const fetchTokenZeroNFTs = async () => {
      const zeroNFTs = await Promise.all(
        nftCollections.map(async (collection) => {
          const nftContract = getContract({
            address: collection.address,
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
      setNfts(zeroNFTs.filter((nft) => nft !== null) as NFT[]);
      console.log("Fetched NFTs with Token ID 0:", zeroNFTs);
    };

    fetchTokenZeroNFTs();
  }, [nftCollections]);

  // Handle NFT click and redirect to Mintpad permalink
  const handleNFTClick = (permalink: string) => {
    window.open(`https://on.mintpad.co/${permalink}`, "_blank"); // Open in new tab
  };

  return (
    <div className="m-0 bg-[#0A0A0A] p-0 font-inter text-neutral-200">
      <Header />

      <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4">

        <div className="flex items-center justify-center mb-4">
     
        <h1 className="text-4xl font-bold text-blue ">Mint Terminal</h1>
        </div>
<br></br>
        {isSearching && (
          <div className="mx-auto !h-60 !w-60 animate-pulse rounded-lg bg-gray-800" />
        )}

        {/* Display NFTs in a horizontal layout */}
        <div className="flex flex-wrap space-x-4">
          {nfts.map((nft, index) => (
            <div key={nft.id.toString()} className="cursor-pointer">
              <NFTCard
                nft={nft}
                onClick={() => handleNFTClick(nftCollections[index].permalink)} // Attach click handler
                collectionName={nftCollections[index].name} // Pass collection name
                imageSrc={nft.metadata.image || "https://pbs.twimg.com/media/Gag4bqOWEAE56-0.png"} // Use placeholder if no image
              />
            </div>
          ))}
        </div>
      </div>

      <Footer
        page={0}
        setPage={(page: number): void => {
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
