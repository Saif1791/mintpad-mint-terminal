import { client } from "@/consts/parameters";
import { FC, useState } from "react";
import { NFT } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";

interface INFTCardProps {
  nft: NFT;
  onClick: () => void; // Add onClick prop
  collectionName: string; // Add collectionName prop
  imageSrc: string; // Add imageSrc prop
}

export const NFTCard: FC<INFTCardProps> = ({
  nft,
  onClick,
  collectionName,
  imageSrc,
}) => {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      className="z-10 mx-auto flex h-36 w-36 cursor-pointer flex-col items-center justify-center gap-4 bg-transparent transition-all duration-300 hover:scale-105 md:h-60 md:w-60"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick} // Attach the onClick handler
    >
      <MediaRenderer client={client} src={imageSrc} />

      {hover && (
        <div className="absolute flex h-36 w-36 flex-col items-center justify-center rounded-lg bg-black/50 backdrop-filter md:h-60 md:w-60">
          <h1 className="text-2xl text-gray-200">{collectionName}</h1>
        </div>
      )}
    </div>
  );
};
