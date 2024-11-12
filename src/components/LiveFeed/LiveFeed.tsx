import React from "react";
import { motion } from "framer-motion";
import { Pause, VolumeOff } from "lucide-react";
import LiveFeedCard from "./LiveFeedCard";

const buttonVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

export default function LiveFeed() {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="text-white py-2 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 mb-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            LIVE FEED
          </motion.h1>
          <motion.button
            className="focus:outline-none"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Pause className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="focus:outline-none"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <VolumeOff className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {["1h", "6h", "24h"].map((time) => (
            <motion.button
              key={time}
              className="focus:outline-none px-3 py-1 rounded-md hover:bg-gray-800"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {time}
            </motion.button>
          ))}
        </div>
      </div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
        variants={containerVariants}
      >
        {sampleData.map((item, index) => (
          <LiveFeedCard key={index} item={item} />
        ))}
      </motion.div>
    </motion.div>
  );
}
