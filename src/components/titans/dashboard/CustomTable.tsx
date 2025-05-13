"use client";
import React from "react";
import { FaCaretRight } from "react-icons/fa";

interface Column {
  header: string;
  accessor: string;
  className?: string;
}

interface CustomTableProps {
  data: Record<string, any>[];
  columns: Column[];
  headerClassName?: string;
  rowClassName?: string;
  showRowBorder?: boolean;
  showRowIcon?: boolean;
  roundedHeader?: boolean;
  columnTextColor?: string;
  rowTextColor?: string;
  cellPaddingY?: string;
  cellMarginB?: string;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  headerClassName,
  rowClassName,
  showRowBorder = true,
  showRowIcon = false,
  roundedHeader = false,
  columnTextColor = "text-gray-700",
  rowTextColor = "text-gray-800",
  cellPaddingY,
  cellMarginB,
}) => {
  return (
    <div className="overflow-x-auto text-sm rounded-2xl">
      <table className="min-w-full text-left">
        <thead
          className={`${headerClassName || "bg-gray-100"} ${
            roundedHeader ? "rounded-t-lg rounded-b-lg overflow-hidden" : ""
          }`}
        >
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className={`px-4 py-2 font-medium ${columnTextColor}`}
              >
                {col.header}
              </th>
            ))}
            {/* No header for the icon, but keep alignment */}
            {showRowIcon && <th className="w-6"></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`${rowClassName || ""} ${
                showRowBorder ? "border-b" : ""
              }`}
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className={`px-4 pb-3 ${cellPaddingY || "py-4"} ${
                    cellMarginB || "mb-2"
                  } ${rowTextColor} ${col.className || ""}`}
                >
                  {row[col.accessor]}
                </td>
              ))}
              {showRowIcon && (
                <td className="pr-4 text-gray-400 text-right align-middle">
                  <FaCaretRight />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
