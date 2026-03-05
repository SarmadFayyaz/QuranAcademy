"use client";

import { useState, useEffect, useCallback } from "react";
import { Pencil, Trash2, KeyRound, AlertTriangle, X } from "lucide-react";
import Pagination from "./Pagination";
import { useToast } from "./Toast";
import type { Profile, UserRole } from "@/lib/supabase/types";

interface UserTableProps {
  roleFilter?: string;
  showActions?: boolean;
  onRefreshKey?: number;
  onEdit?: (user: Profile) => void;
  onChangePassword?: (user: Profile) => void;
  onCallerRole?: (role: UserRole) => void;
}

export default function UserTable({
  roleFilter,
  showActions = false,
  onRefreshKey = 0,
  onEdit,
  onChangePassword,
  onCallerRole,
}: UserTableProps) {
  const toast = useToast();
  const [users, setUsers] = useState<Profile[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [myRole, setMyRole] = useState<UserRole>("manager");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);
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
      if (json.callerRole) {
        setMyRole(json.callerRole);
        if (onCallerRole) onCallerRole(json.callerRole);
      }
    }
    setLoading(false);
  }, [page, roleFilter]);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, roleFilter, onRefreshKey]);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    const res = await fetch(`/api/users/${deleteTarget.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success(`User "${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
      fetchUsers();
    } else {
      const json = await res.json();
      toast.error(json.error || "Failed to delete user");
    }
    setDeleting(false);
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
                        u.role === "manager"
                          ? "bg-purple-100 text-purple-700"
                          : u.role === "supervisor"
                          ? "bg-indigo-100 text-indigo-700"
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
                        {onChangePassword && (
                          <button
                            onClick={() => onChangePassword(u)}
                            className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition"
                            title="Change password"
                          >
                            <KeyRound size={16} />
                          </button>
                        )}
                        {myRole === "manager" && (
                          <button
                            onClick={() => setDeleteTarget({ id: u.id, name: u.full_name || "unnamed" })}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
                            title="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
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

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onKeyDown={(e) => { if (e.key === "Escape" && !deleting) setDeleteTarget(null); }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => !deleting && setDeleteTarget(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <button
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-heading">
                Delete User
              </h3>
            </div>

            <p className="text-sm text-gray-600 mb-1">
              Are you sure you want to delete <span className="font-semibold text-gray-900">&quot;{deleteTarget.name}&quot;</span>?
            </p>
            <p className="text-xs text-red-500 mb-6">
              This action cannot be undone. The user account and all associated data will be permanently removed.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
