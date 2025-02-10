import React from "react";
import clsx from "clsx";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  title?: string;
  columns: Column[];
  data: Record<string, any>[];
}

const DataTable: React.FC<DataTableProps> = ({ title, columns, data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      {title && (
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-200">
          {title}
        </h2>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b dark:border-gray-600"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={clsx(
                    "hover:bg-gray-50 dark:hover:bg-gray-600 transition",
                    rowIndex % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b dark:border-gray-600"
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-400"
                  colSpan={columns.length}
                >
                  データがありません
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
