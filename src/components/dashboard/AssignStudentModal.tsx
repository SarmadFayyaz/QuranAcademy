"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useToast } from "./Toast";
import type { Profile } from "@/lib/supabase/types";

interface AssignStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssigned: () => void;
}

export default function AssignStudentModal({
  isOpen,
  onClose,
  onAssigned,
}: AssignStudentModalProps) {
  const [teachers, setTeachers] = useState<Profile[]>([]);
  const [students, setStudents] = useState<Profile[]>([]);
  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchOptions = async () => {
      setFetching(true);
      const [tRes, sRes] = await Promise.all([
        fetch("/api/users?role=teacher&limit=50"),
        fetch("/api/users?role=student&limit=50"),
      ]);
      const [tJson, sJson] = await Promise.all([tRes.json(), sRes.json()]);

      if (tRes.ok) setTeachers(tJson.data);
      if (sRes.ok) setStudents(sJson.data);
      setFetching(false);
    };

    fetchOptions();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teacherId || !studentId) {
      toast.error("Please select both a teacher and a student");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/assignments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teacher_id: teacherId, student_id: studentId }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(json.error || "Failed to create assignment");
      return;
    }

    toast.success("Student assigned successfully");
    setTeacherId("");
    setStudentId("");
    onAssigned();
    onClose();
  };

  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm";

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-[60] flex items-center justify-center p-4" onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900 font-heading">
            Assign Student to Teacher
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {fetching ? (
            <p className="text-center text-gray-400 py-4">Loading...</p>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Teacher *
                </label>
                <select
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select a teacher</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.full_name || t.id.slice(0, 8)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Student *
                </label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select a student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.full_name || s.id.slice(0, 8)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-base !py-3.5 disabled:opacity-50"
              >
                {loading ? "Assigning..." : "Assign Student"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
