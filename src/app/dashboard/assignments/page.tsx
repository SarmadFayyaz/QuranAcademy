"use client";

import { useState, useEffect, useCallback } from "react";
import { UserCheck, Trash2 } from "lucide-react";
import Pagination from "@/components/dashboard/Pagination";
import AssignStudentModal from "@/components/dashboard/AssignStudentModal";
import { useToast } from "@/components/dashboard/Toast";

interface Assignment {
  id: string;
  teacher_id: string;
  student_id: string;
  assigned_at: string;
  teacher: { id: string; full_name: string | null };
  student: { id: string; full_name: string | null };
}

export default function AssignmentsPage() {
  const toast = useToast();
  const [showAssign, setShowAssign] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchAssignments = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `/api/assignments?page=${page}&limit=${limit}`
    );
    const json = await res.json();
    if (res.ok) {
      setAssignments(json.data);
      setTotal(json.total);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleRemove = async (id: string) => {
    if (!confirm("Remove this assignment?")) return;

    const res = await fetch(`/api/assignments/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Assignment removed");
      fetchAssignments();
    } else {
      const json = await res.json();
      toast.error(json.error || "Failed to remove");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-heading">
            Assignments
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Assign students to teachers.
          </p>
        </div>
        <button
          onClick={() => setShowAssign(true)}
          className="btn-primary text-sm"
        >
          <UserCheck size={18} className="mr-2" />
          Assign Student
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-3 font-semibold text-gray-600">
                  Teacher
                </th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600">
                  Student
                </th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden sm:table-cell">
                  Assigned
                </th>
                <th className="text-right px-6 py-3 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : assignments.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    No assignments yet
                  </td>
                </tr>
              ) : (
                assignments.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {a.teacher?.full_name || a.teacher_id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {a.student?.full_name || a.student_id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                      {new Date(a.assigned_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemove(a.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition"
                        title="Remove assignment"
                      >
                        <Trash2 size={16} />
                      </button>
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
          Showing {assignments.length} of {total} assignments
        </div>
      </div>

      <AssignStudentModal
        isOpen={showAssign}
        onClose={() => setShowAssign(false)}
        onAssigned={fetchAssignments}
      />
    </div>
  );
}
