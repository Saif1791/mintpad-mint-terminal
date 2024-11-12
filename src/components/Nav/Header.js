import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { nftContract } from "@/consts/parameters";
import { Link } from "react-router-dom";
import { getContractMetadata } from "thirdweb/extensions/common";
import { getNFT } from "thirdweb/extensions/erc721";
import { useReadContract } from "thirdweb/react";
export const Header = () => {
    const { data: firstNFT, isLoading: nftLoading } = useReadContract(getNFT, {
        contract: nftContract,
        tokenId: 1n,
    });
    const { data: contractMetadata, isLoading: contractLoading } = useReadContract(getContractMetadata, {
        contract: nftContract,
    });
    return (_jsxs("header", { className: "mx-auto mb-12 flex w-full max-w-7xl items-center justify-between p-4", children: [_jsx(Link, { to: "/", children: _jsx("div", { className: "flex items-center space-x-4", children: contractLoading ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-14 w-14 animate-pulse rounded-full bg-gray-800" }), _jsx("div", { className: "h-4 w-40 animate-pulse rounded-md bg-gray-800" })] })) : (_jsx(_Fragment, { children: _jsx("p", { className: "text-2xl font-bold text-white", children: _jsx("img", { src: "https://mintpad.co/wp-content/uploads/2023/03/Logo-Mintpad-Grey.webp", alt: "Mintpad Logo", className: "h-10 mr-2" // Adjust height and margin as needed
                             }) }) })) }) }), _jsx("div", { className: "max-w-xs" })] }));
};
