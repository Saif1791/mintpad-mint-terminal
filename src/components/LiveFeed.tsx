import React, { useState } from "react";
import { X, Expand, ExternalLink, Globe } from "lucide-react";

// Type Definitions
interface NFTItem {
  image: string;
  title: string;
  edition: string;
  mints: string;
  endTime: string;
  mintPrice: string;
  description: string;
}

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: NFTItem;
}

interface LiveFeedCardProps {
  item: NFTItem;
}

// Modal Component
const NFTModal: React.FC<NFTModalProps> = ({ isOpen, onClose, item }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#121218] rounded-xl max-w-2xl w-full relative text-white overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-2xl font-semibold">{item.title}</h2>
          <div className="flex gap-4">
            <button className="hover:opacity-80">
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="hover:opacity-80">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Image */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-[#1a1a2e]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-lg hover:bg-black/70">
                  <Expand className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right side - Details */}
            <div className="w-full md:w-1/2 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Total Mints</p>
                  <p className="text-xl font-semibold">{item.mints}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Max Supply</p>
                  <p className="text-xl font-semibold">Unlimited</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Mint Progress</p>
                  <p className="text-xl font-semibold">N/A</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Ends In</p>
                  <p className="text-xl font-semibold">{item.endTime}</p>
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-2">
                <h3 className="text-gray-400">About</h3>
                <p className="text-sm">{item.description}</p>
              </div>

              {/* Mint Section */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-gray-400">Price</p>
                  <p className="text-2xl font-bold">{item.mintPrice}</p>
                </div>
                <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold">
                  Mint
                </button>
                <p className="text-xs text-gray-400 text-center">
                  By clicking "mint", you agree to the{" "}
                  <a href="/" className="font-semibold hover:text-white">
                    Mintpad's Terms of Service
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// LiveFeedCard Component
const LiveFeedCard: React.FC<LiveFeedCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="p-4 bg-[#1a1a2e] rounded-lg text-white shadow-md cursor-pointer hover:bg-[#1f1f35]"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-row items-center gap-2">
          <img
            src={item.image}
            alt={item.title}
            className="w-24 h-24 rounded-md"
          />
          <h2 className="text-normal ml-2">{item.title}</h2>
        </div>
        <div className="mt-4 p-3 bg-[#2a2a40] rounded-lg">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">{item.edition}</span>
            <span className="text-gray-400">
              Total minted: <span className="text-white">{item.mints}</span>
            </span>
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-gray-400">
              Ends In:{" "}
              <span className="text-white text-xs">{item.endTime}</span>
            </span>
            <span className="text-gray-400">
              Mint Price:{" "}
              <span className="text-white text-xs">{item.mintPrice}</span>
            </span>
          </div>
        </div>
        <p className="mt-3 text-gray-500 text-xs">{item.description}</p>
      </div>
      <NFTModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={item}
      />
    </>
  );
};

// Main LiveFeed Component
const LiveFeed: React.FC = () => {
  const sampleData = [
    {
      image:
        "https://img-cdn.magiceden.dev/rs:fill:250:0:0/plain/https://img.reservoir.tools/images/v2/apechain/ExqYYI6d1hFsAKQ2q85PIWia8rJATHTlwoHdhxsQbOWIVEGTYkmAzJqeebuyNIL7WZhi2AKImfahQxOxi6oU7OJeEVqO73RBKeqAjRF3eb25uSLsHPApItTAbCf8bcry",
      title: "Aped Monkey",
      edition: "Limited Edition",
      mints: "7,913",
      endTime: "N/A",
      mintPrice: "3 APE",
      description:
        "Special collection for Community holders collection on Ape Chain.",
    },
    {
      image:
        "https://img-cdn.magiceden.dev/rs:fill:250:0:0/plain/https://img.reservoir.tools/images/v2/apechain/ExqYYI6d1hFsAKQ2q85PIWia8rJATHTlwoHdhxsQbOWIVEGTYkmAzJqeebuyNIL7WZhi2AKImfahQxOxi6oU7OJeEVqO73RBKeqAjRF3eb25uSLsHPApItTAbCf8bcry",
      title: "Aped Monkey",
      edition: "Limited Edition",
      mints: "7,913",
      endTime: "N/A",
      mintPrice: "3 APE",
      description:
        "Special collection for Community holders collection on Ape Chain.",
    },
    {
      image:
        "https://img-cdn.magiceden.dev/rs:fill:250:0:0/plain/https://img.reservoir.tools/images/v2/apechain/ExqYYI6d1hFsAKQ2q85PIWia8rJATHTlwoHdhxsQbOWIVEGTYkmAzJqeebuyNIL7WZhi2AKImfahQxOxi6oU7OJeEVqO73RBKeqAjRF3eb25uSLsHPApItTAbCf8bcry",
      title: "Aped Monkey",
      edition: "Limited Edition",
      mints: "7,913",
      endTime: "N/A",
      mintPrice: "3 APE",
      description:
        "Special collection for Community holders collection on Ape Chain.",
    },
    {
      image:
        "https://img-cdn.magiceden.dev/rs:fill:250:0:0/plain/https://img.reservoir.tools/images/v2/apechain/ExqYYI6d1hFsAKQ2q85PIWia8rJATHTlwoHdhxsQbOWIVEGTYkmAzJqeebuyNIL7WZhi2AKImfahQxOxi6oU7OJeEVqO73RBKeqAjRF3eb25uSLsHPApItTAbCf8bcry",
      title: "Aped Monkey",
      edition: "Limited Edition",
      mints: "7,913",
      endTime: "N/A",
      mintPrice: "3 APE",
      description:
        "Special collection for Community holders collection on Ape Chain.",
    },
    {
      image:
        "https://img-cdn.magiceden.dev/rs:fill:250:0:0/plain/https://img.reservoir.tools/images/v2/apechain/ExqYYI6d1hFsAKQ2q85PIWia8rJATHTlwoHdhxsQbOWIVEGTYkmAzJqeebuyNIL7WZhi2AKImfahQxOxi6oU7OJeEVqO73RBKeqAjRF3eb25uSLsHPApItTAbCf8bcry",
      title: "Aped Monkey",
      edition: "Limited Edition",
      mints: "7,913",
      endTime: "N/A",
      mintPrice: "3 APE",
      description:
        "Special collection for Community holders collection on Ape Chain.",
    },
    {
      image:
        "https://img-cdn.magiceden.dev/rs:fill:250:0:0/plain/https://img.reservoir.tools/images/v2/apechain/ExqYYI6d1hFsAKQ2q85PIWia8rJATHTlwoHdhxsQbOWIVEGTYkmAzJqeebuyNIL7WZhi2AKImfahQxOxi6oU7OJeEVqO73RBKeqAjRF3eb25uSLsHPApItTAbCf8bcry",
      title: "Aped Monkey",
      edition: "Limited Edition",
      mints: "7,913",
      endTime: "N/A",
      mintPrice: "3 APE",
      description:
        "Special collection for Community holders collection on Ape Chain.",
    },
    {
      image:
        "https://img-cdn.magiceden.dev/rs:fill:250:0:0/plain/https://img.reservoir.tools/images/v2/apechain/ExqYYI6d1hFsAKQ2q85PIWia8rJATHTlwoHdhxsQbOWIVEGTYkmAzJqeebuyNIL7WZhi2AKImfahQxOxi6oU7OJeEVqO73RBKeqAjRF3eb25uSLsHPApItTAbCf8bcry",
      title: "Aped Monkey",
      edition: "Limited Edition",
      mints: "7,913",
      endTime: "N/A",
      mintPrice: "3 APE",
      description:
        "Special collection for Community holders collection on Ape Chain.",
    },
    {
      image:
        "https://img-cdn.magiceden.dev/rs:fill:250:0:0/plain/https://img.reservoir.tools/images/v2/apechain/ExqYYI6d1hFsAKQ2q85PIWia8rJATHTlwoHdhxsQbOWIVEGTYkmAzJqeebuyNIL7WZhi2AKImfahQxOxi6oU7OJeEVqO73RBKeqAjRF3eb25uSLsHPApItTAbCf8bcry",
      title: "Aped Monkey",
      edition: "Limited Edition",
      mints: "7,913",
      endTime: "N/A",
      mintPrice: "3 APE",
      description:
        "Special collection for Community holders collection on Ape Chain.",
    },
  ];

  return (
    <div className="w-full">
      <div className="text-white py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 mb-12">
          <h1>LIVE FEED</h1>
          <button className="focus:outline-none">
            <span className="sr-only">Pause</span>
            <X className="w-5 h-5" />
          </button>
          <button className="focus:outline-none">
            <span className="sr-only">Mute</span>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button className="focus:outline-none">1h</button>
          <button className="focus:outline-none">6h</button>
          <button className="focus:outline-none">24h</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sampleData.map((item, index) => (
          <LiveFeedCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;
