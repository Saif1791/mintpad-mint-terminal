import React from "react";
import LiveFeed from "./LiveFeed/LiveFeed";

const MintTerminal: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* card */}
      <div className="w-96 p-4 mb-12 bg-[#1a1a2e] rounded-lg text-white shadow-md">
        <div className="flex justify-end gap-2">
          <p className="text-xs bg-red-600 py-1 px-2 rounded-full bg-opacity-40">
            ⚠️Almost Gone
          </p>
          <p className="text-xs bg-purple-600 py-1 px-2 rounded-full bg-opacity-40">
            📈Trending
          </p>
        </div>
        <div className="flex flex-row mt-[-20px] items-center gap-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3yeYfA73SKtf6QK2tue2PqIMqQaWHdOg6aw&s" // Placeholder image path
            alt="Ape Punk"
            className="w-24 h-24 rounded-md"
          />
          <h2 className="text-normal ml-2">Ape Punk</h2>
        </div>
        <div className="mt-4 p-3 bg-[#2a2a40] rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Limited Edition</span>
            <span className="text-pink-400">Mints Last Hour: 7,913</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span className="text-gray-400">
              Ends In: <span className="text-white">N/A</span>
            </span>
            <span className="text-gray-400">
              Mint Price: <span className="text-white">3 APE</span>
            </span>
          </div>
        </div>
        <p className="mt-3 text-gray-500 text-sm">No Description</p>
      </div>
      <LiveFeed />
    </div>
  );
};

export default MintTerminal;
