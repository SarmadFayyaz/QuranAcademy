"use client";

import { useState, useEffect, useCallback } from "react";
import Pagination from "@/components/dashboard/Pagination";

interface StudentAssignment {
  id: string;
  student_id: string;
  assigned_at: string;
  student: { id: string; full_name: string | null };
}

export default function MyStudentsPage() {
  const [assignments, setAssignments] = useState<StudentAssignment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetchStudents = useCallback(async () => {
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
    fetchStudents();
  }, [fetchStudents]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-heading">
          My Students
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Students assigned to you.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-6 py-3 font-semibold text-gray-600">
                  Student Name
                </th>
                <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden sm:table-cell">
                  Assigned Date
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : assignments.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-gray-400">
                    No students assigned yet
                  </td>
                </tr>
              ) : (
                assignments.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {a.student?.full_name || a.student_id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">
                      {new Date(a.assigned_at).toLocaleDateString()}
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
          {total} student{total !== 1 ? "s" : ""} assigned
        </div>
      </div>
    </div>
  );
}
