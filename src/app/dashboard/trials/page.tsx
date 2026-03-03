"use client";

import { useState, useEffect, useCallback } from "react";
import { UserPlus, XCircle } from "lucide-react";
import Pagination from "@/components/dashboard/Pagination";
import CreateUserModal from "@/components/dashboard/CreateUserModal";
import { useToast } from "@/components/dashboard/Toast";

interface Trial {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  course: string | null;
  preferred_time: string | null;
  message: string | null;
  source: "hero" | "register";
  status: "new" | "converted" | "lost";
  created_at: string;
}

const tabs = [
  { label: "Active", value: "" },
  { label: "New", value: "new" },
  { label: "Converted", value: "converted" },
  { label: "Lost", value: "lost" },
] as const;

export default function TrialsPage() {
  const toast = useToast();
  const [trials, setTrials] = useState<Trial[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [convertData, setConvertData] = useState<{
    full_name: string;
    email: string;
    phone: string;
    country: string;
  } | null>(null);
  const [convertTrialId, setConvertTrialId] = useState<string | null>(null);
  const limit = 10;

  const fetchTrials = useCallback(async () => {
    setLoading(true);
    const statusParam = statusFilter ? `&status=${statusFilter}` : "";
    const res = await fetch(`/api/trials?page=${page}&limit=${limit}${statusParam}`);
    const json = await res.json();
    if (res.ok) {
      setTrials(json.data);
      setTotal(json.total);
    }
    setLoading(false);
  }, [page, statusFilter]);

  useEffect(() => {
    fetchTrials();
  }, [fetchTrials]);

  const handleConvert = (trial: Trial) => {
    setConvertData({
      full_name: trial.name,
      email: trial.email,
      phone: trial.phone,
      country: trial.country,
    });
    setConvertTrialId(trial.id);
    setShowCreate(true);
  };

  const handleMarkLost = async (trial: Trial) => {
    const res = await fetch("/api/trials", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: trial.id, status: "lost" }),
    });

    if (res.ok) {
      toast.success(`"${trial.name}" marked as lost`);
      fetchTrials();
    } else {
      const json = await res.json();
      toast.error(json.error || "Failed to update status");
    }
  };

  const handleUserCreated = async () => {
    // Mark the trial as converted
    if (convertTrialId) {
      await fetch("/api/trials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: convertTrialId, status: "converted" }),
      });
    }
    fetchTrials();
  };

  const totalPages = Math.ceil(total / limit);

  const statusBadge = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "converted":
        return "bg-green-100 text-green-700";
      case "lost":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-heading">
          Free Trial Requests
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          View trial requests and convert them to student accounts.
        </p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => {
              setStatusFilter(tab.value);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              statusFilter === tab.value
                ? "bg-primary-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

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
                <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden md:table-cell">
                  Phone
                </th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden lg:table-cell">
                  Country
                </th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden lg:table-cell">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden md:table-cell">
                  Date
                </th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : trials.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    No trial requests found
                  </td>
                </tr>
              ) : (
                trials.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {t.name}
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                      {t.email}
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                      {t.phone}
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden lg:table-cell">
                      {t.country}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusBadge(t.status)}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden md:table-cell">
                      {new Date(t.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {t.status === "new" && (
                          <>
                            <button
                              onClick={() => handleConvert(t)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 text-xs font-medium transition"
                            >
                              <UserPlus size={14} />
                              Convert
                            </button>
                            <button
                              onClick={() => handleMarkLost(t)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 text-xs font-medium transition"
                            >
                              <XCircle size={14} />
                              Lost
                            </button>
                          </>
                        )}
                      </div>
                    </td>
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
          Showing {trials.length} of {total} requests
        </div>
      </div>

      <CreateUserModal
        isOpen={showCreate}
        onClose={() => {
          setShowCreate(false);
          setConvertData(null);
          setConvertTrialId(null);
        }}
        onCreated={handleUserCreated}
        defaultValues={convertData || undefined}
        invite
      />
    </div>
  );
}
