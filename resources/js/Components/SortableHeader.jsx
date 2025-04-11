import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react"; // or whatever icon package you're using

export default function SortableHeader({
  label,
  sortKey,
  currentSortField,
  currentSortOrder,
  onSort,
  extraClasses = "",
}) {
  const isActive = currentSortField === sortKey;
  const isAsc = currentSortOrder === "asc";

  return (
    <th
      onClick={() => onSort(sortKey)}
      className={`cursor-pointer select-none ${extraClasses}`}
    >
      <div className="flex items-center justify-between gap-1 px-6 py-4">
        {label}
        <div className="flex flex-col items-center">
          <ChevronUp
            className={`w-4 ${
              isActive && isAsc ? "text-blue-600" : "text-gray-400"
            }`}
          />
          <ChevronDown
            className={`w-4 -mt-2 ${
              isActive && !isAsc ? "text-blue-600" : "text-gray-400"
            }`}
          />
        </div>
      </div>
    </th>
  );
}
