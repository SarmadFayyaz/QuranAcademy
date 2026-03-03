"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import UserTable from "@/components/dashboard/UserTable";
import CreateUserModal from "@/components/dashboard/CreateUserModal";
import EditUserModal from "@/components/dashboard/EditUserModal";
import type { Profile } from "@/lib/supabase/types";

export default function ManageUsersPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [roleFilter, setRoleFilter] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            Manage Users
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Create and manage student and teacher accounts.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="btn-primary text-sm"
        >
          <UserPlus size={18} className="mr-2" />
          Create User
        </button>
      </div>

      {/* Role Filter */}
      <div className="flex gap-2">
        {["", "student", "teacher", "manager"].map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              roleFilter === r
                ? "bg-primary-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {r === "" ? "All" : r.charAt(0).toUpperCase() + r.slice(1) + "s"}
          </button>
        ))}
      </div>

      <UserTable
        roleFilter={roleFilter || undefined}
        showActions
        onRefreshKey={refreshKey}
        onEdit={(user) => setEditingUser(user)}
      />

      <CreateUserModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={() => setRefreshKey((k) => k + 1)}
      />

      <EditUserModal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(null)}
        onUpdated={() => setRefreshKey((k) => k + 1)}
        user={editingUser}
      />
    </div>
  );
}
