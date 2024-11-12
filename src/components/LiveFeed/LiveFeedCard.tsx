import React, { useState } from "react";
import { motion } from "framer-motion";
import NFTModal from "./NFTModal";

const LiveFeedCard = ({ item }: { item: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        className="p-4 bg-[#1a1a2e] rounded-lg text-white shadow-md cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.02,
          backgroundColor: "#1f1f35",
          transition: { duration: 0.2 },
        }}
        onClick={() => setIsModalOpen(true)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex flex-row items-center gap-2">
          <motion.img
            src={item.image}
            alt={item.title}
            className="w-24 h-24 rounded-md"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <h2 className="text-normal ml-2 font-medium">{item.title}</h2>
        </div>
        <motion.div
          className="mt-4 p-3 bg-[#2a2a40] rounded-lg"
          animate={{
            backgroundColor: isHovered ? "#2f2f4a" : "#2a2a40",
          }}
          transition={{ duration: 0.2 }}
        >
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
        </motion.div>
        <motion.p
          className="mt-3 text-gray-500 text-xs"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
        >
          {item.description}
        </motion.p>
      </motion.div>
      <NFTModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={item}
      />
    </>
  );
};

export default LiveFeedCard;
