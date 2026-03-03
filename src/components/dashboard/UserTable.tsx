"use client";

import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";
import Pagination from "./Pagination";
import { useToast } from "./Toast";
import type { Profile } from "@/lib/supabase/types";

interface UserTableProps {
  roleFilter?: string;
  showActions?: boolean;
  onRefreshKey?: number;
  onEdit?: (user: Profile) => void;
}

export default function UserTable({
  roleFilter,
  showActions = false,
  onRefreshKey = 0,
  onEdit,
}: UserTableProps) {
  const toast = useToast();
  const [users, setUsers] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });
    if (roleFilter) params.set("role", roleFilter);

    const res = await fetch(`/api/users?${params}`);
    const json = await res.json();

    if (res.ok) {
      setUsers(json.data);
      setTotal(json.total);
    }
    setLoading(false);
  }, [page, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, onRefreshKey]);

  const handleDelete = async (id: string, name: string | null) => {
    if (!confirm(`Delete user "${name || "unnamed"}"? This cannot be undone.`))
      return;

    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success(`User "${name || "unnamed"}" deleted`);
      fetchUsers();
    } else {
      const json = await res.json();
      toast.error(json.error || "Failed to delete user");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-6 py-3 font-semibold text-gray-600">
                Name
              </th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden sm:table-cell">
                Email
              </th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">
                Role
              </th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden md:table-cell">
                Phone
              </th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden lg:table-cell">
                Country
              </th>
              {showActions && (
                <th className="text-right px-6 py-3 font-semibold text-gray-600">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={showActions ? 6 : 5}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={showActions ? 6 : 5}
                  className="px-6 py-12 text-center text-gray-400"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {u.full_name || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                    {u.email || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        u.role === "manager" || u.role === "supervisor"
                          ? "bg-purple-100 text-purple-700"
                          : u.role === "teacher"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                    {u.phone || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">
                    {u.country || "—"}
                  </td>
                  {showActions && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(u)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition"
                            title="Edit user"
                          >
                            <Pencil size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(u.id, u.full_name)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
                          title="Delete user"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-100">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}

      <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
        Showing {users.length} of {total} users
      </div>
    </div>
  );
}
