import React from "react";
import { ChevronRight, ChevronLast } from "lucide-react";
import { useSetupContext } from "@/Context/SetupProvider";

const Pagination = ({ links, meta, handlePageChange }) => {
  const {t} = useSetupContext();
  const PaginationButton = ({
    onClick,
    disabled,
    children,
    className = "",
  }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
        px-2 text-sm font-medium rounded-lg border transition-all duration-200
        ${
          disabled
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-900 active:bg-gray-100"
        }
        ${className}
      `}
      >
        {children}
      </button>
    );
  };

  return (
    <>
      <div className="flex justify-center gap-1 my-6">
        <PaginationButton
          onClick={() => handlePageChange(links.first)}
          disabled={!links.prev}
        >
          <ChevronLast className="ltr:rotate-180 rtl:rotate-0" />
        </PaginationButton>

        <PaginationButton
          onClick={() => handlePageChange(links.prev)}
          disabled={!links.prev}
        >
          <ChevronRight className="ltr:rotate-180 rtl:rotate-0" />
        </PaginationButton>

        <div className="px-2 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <span className="text-sm font-medium text-gray-700">
            {t("Page")} {" "}
            <span className="font-bold text-blue-600">{meta.current_page}</span>{" "}
            {t("of")} <span className="font-bold text-blue-600">{meta.last_page}</span>
          </span>
        </div>

        <PaginationButton
          onClick={() => handlePageChange(links.next)}
          disabled={!links.next}
        >
          <ChevronRight className="ltr:rotate-0 rtl:rotate-180" />
        </PaginationButton>

        <PaginationButton
          onClick={() => handlePageChange(links.last)}
          disabled={!links.next}
        >
          <ChevronLast  className="ltr:rotate-0 rtl:rotate-180"/>
        </PaginationButton>

      </div>
    </>
  );
};

export default Pagination;
