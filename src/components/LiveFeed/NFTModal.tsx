import React, { useState, useEffect } from "react";
import { X, Expand, Globe } from "lucide-react";
interface Item {
  title: string;
  image: string;
  mints: number;
  endTime: string;
  description: string;
  mintPrice: string;
}

interface NFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
}

const NFTModal: React.FC<NFTModalProps> = ({ isOpen, onClose, item }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-200 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-slate-900 rounded-xl max-w-2xl w-full relative text-white overflow-hidden transform transition-all duration-200 ${
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-2xl font-semibold">{item.title}</h2>
          <div className="flex gap-4">
            <button className="hover:opacity-80 transition-opacity duration-200 hover:scale-110 active:scale-95">
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="hover:opacity-80 transition-opacity duration-200 hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left side - Image */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-800 group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <button className="absolute top-3 right-3 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-all duration-200 hover:scale-110 active:scale-95">
                  <Expand className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right side - Details */}
            <div className="w-full md:w-1/2 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Total Mints", value: item.mints },
                  { label: "Max Supply", value: "Unlimited" },
                  { label: "Mint Progress", value: "N/A" },
                  { label: "Ends In", value: item.endTime },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-xl font-semibold">{stat.value}</p>
                  </div>
                ))}
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
                <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  Mint
                </button>
                <p className="text-xs text-gray-400 text-center">
                  By clicking "mint", you agree to the{" "}
                  <a
                    href="/"
                    className="font-semibold hover:text-white inline-block transition-transform duration-200 hover:scale-105"
                  >
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

export default NFTModal;
