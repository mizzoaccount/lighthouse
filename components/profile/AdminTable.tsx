"use client";

import { Edit, Trash, Plus, User } from "lucide-react";

interface AdminTableProps {
  title: string;
  columns: {
    key: string;
    label: string;
    render?: (value: any) => React.ReactNode;
  }[];
  data: any[];
  onAdd: () => void;
  onEdit: (_id: string) => void;
  onDelete: (_id: string) => void;
  loading?: boolean;
  error?: string | null;
  pagination?: any;
  onPageChange?: (page: number) => void;
  onSearch?: (term: string) => void;
}

export const AdminTable = ({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
}: AdminTableProps) => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-blue-800">{title}</h2>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold rounded-full transition-colors"
      >
        <Plus size={16} /> Add {title.split(" ")[0]}
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-blue-600">
        <thead className="bg-blue-900">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-600">
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td
                  key={`${item.id}-${column.key}`}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {column.render ? (
                    column.render(item[column.key])
                  ) : (
                    <div className="text-sm text-gray-700">{item[column.key]}</div>
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(item.id)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);