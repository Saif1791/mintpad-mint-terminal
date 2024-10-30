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
    } catch (error) {
      console.error("Error fetching NFT collections:", error);
    }
  };

  useEffect(() => {
    fetchNftCollections();
  }, []);

  const fetchNFT = async (nftContractAddress: string) => {
    if (!debouncedSearchTerm) return null;
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
    };
    fetchTokenZeroNFTs();
  }, [nftCollections]);

  const handleNFTClick = (permalink: string) => {
    window.open(`https://on.mintpad.co/${permalink}`, "_blank");
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-white font-inter">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-extrabold text-blue-400">Mint Terminal</h1>
          <p className="text-gray-400 mt-2">Live ApeChain NFT Mints</p>
        </div>

        {isSearching ? (
          <div className="flex justify-center my-8">
            <div className="h-20 w-20 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft, index) => (
              <div
                key={nft.id.toString()}
                onClick={() => handleNFTClick(nftCollections[index].permalink)}
                className="relative cursor-pointer transition-transform duration-300 transform hover:scale-105"
              >
                <div className="p-1 rounded-lg bg-gradient-to-r from-blue-500 via-pink-500 to-blue-500 shadow-md">
                  <div className="bg-gray-900 rounded-lg p-4">
                    <NFTCard
                      nft={nft}
                      collectionName={nftCollections[index].name}
                      imageSrc={nft.metadata.image || "https://example.com/placeholder.png"} onClick={function (): void {
                        throw new Error("Function not implemented.");
                      } }                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer page={0} setPage={function (page: number): void {
        throw new Error("Function not implemented.");
      } } nftsPerPage={0} totalCount={undefined} loading={false} />
    </div>
  );
}

export default App;
