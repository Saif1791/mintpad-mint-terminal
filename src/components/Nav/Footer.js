import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { PaginationHelper } from "../PaginationHelper";
import { PoweredBy } from "../PoweredBy";
export const Footer = ({ page, setPage, nftsPerPage, totalCount, loading, }) => {
    if (!totalCount)
        return null;
    const noOfPages = Math.ceil(totalCount / nftsPerPage);
    const start = (page - 1) * nftsPerPage;
    const end = start + nftsPerPage;
    return (_jsxs("div", { className: "mb-4 mt-10 flex w-full flex-col items-center gap-6 md:flex-row md:justify-between md:gap-0", children: [_jsxs("h3", { className: "text-2xl font-bold text-[#646D7A]", children: [end, " / ", totalCount.toLocaleString()] }), _jsx(PaginationHelper, { page: page, noOfPages: noOfPages, setPage: setPage, loading: loading }), _jsx(PoweredBy, {})] }));
};
