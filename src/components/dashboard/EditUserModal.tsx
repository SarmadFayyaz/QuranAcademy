"use client";

import { useState, useEffect } from "react";
import { X, User, BookOpen, FileText, Eye, AlertTriangle } from "lucide-react";
import { useToast } from "./Toast";
import CountryPhoneFields from "@/components/CountryPhoneFields";
import { findCountryByName, findCountryByCode } from "@/lib/countries";
import type { Profile } from "@/lib/supabase/types";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
  user: Profile | null;
}

export default function EditUserModal({
  isOpen,
  onClose,
  onUpdated,
  user,
}: EditUserModalProps) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    role: "" as "student" | "teacher" | "manager" | "supervisor" | "",
    phone: "",
    countryCode: "",
    teacher_type: "" as "" | "quran" | "subject",
    subjects: "",
    bio: "",
    is_public: false,
  });

  useEffect(() => {
    if (isOpen && user) {
      const country = user.country ? findCountryByName(user.country) : null;
      setForm({
        full_name: user.full_name || "",
        role: user.role,
        phone: user.phone || "",
        countryCode: country?.code || "",
        teacher_type: user.teacher_type || "",
        subjects: user.subjects || "",
        bio: user.bio || "",
        is_public: user.is_public || false,
      });
    }
  }, [isOpen, user]);

  if (!isOpen || !user) return null;

  const isTeacherLike = ["teacher", "manager", "supervisor"].includes(form.role);
  const roleChanged = form.role !== user.role;
  const roleLevel: Record<string, number> = { student: 0, teacher: 1, manager: 2, supervisor: 3 };
  const isPromotion = roleChanged && roleLevel[form.role] > roleLevel[user.role];

  const roleWarning = isPromotion
    ? form.role === "manager"
      ? `This will give "${form.full_name || user.full_name}" full manager access including creating users, changing roles, and managing all data.`
      : `This will promote "${form.full_name || user.full_name}" from ${user.role} to teacher, allowing them to be assigned students and appear on the Teachers page.`
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const countryName = findCountryByCode(form.countryCode)?.name || form.countryCode;

    const body: Record<string, unknown> = {
      full_name: form.full_name,
      role: form.role,
      phone: form.phone || null,
      country: countryName || null,
    };

    if (isTeacherLike) {
      body.teacher_type = form.teacher_type || null;
      body.subjects = form.teacher_type === "subject" ? form.subjects || null : null;
      body.bio = form.bio || null;
      body.is_public = form.is_public;
    }

    const res = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(json.error || "Failed to update user");
      return;
    }

    toast.success(`User "${form.full_name}" updated`);
    onUpdated();
    onClose();
  };

  const inputClass =
    "w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm";

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-[60] flex items-center justify-center p-4" onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900 font-heading">
            Edit User
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                required
                className={inputClass}
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as "student" | "teacher" | "manager" | "supervisor" })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="manager">Manager</option>
            </select>
            {roleWarning && (
              <div className="mt-2 flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>{roleWarning}</span>
              </div>
            )}
          </div>

          {/* Country & Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Country & Phone
            </label>
            <div className="grid grid-cols-1 gap-3">
              <CountryPhoneFields
                country={form.countryCode}
                phone={form.phone}
                onChange={(code, ph) => setForm({ ...form, countryCode: code, phone: ph })}
                inputClass={inputClass}
                required={false}
              />
            </div>
          </div>

          {/* Teacher-specific fields */}
          {isTeacherLike && (
            <>
              <div className="pt-2 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3">
                  Teacher Profile
                </h3>
              </div>

              {/* Teacher Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Teacher Type
                </label>
                <div className="relative">
                  <BookOpen
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <select
                    value={form.teacher_type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        teacher_type: e.target.value as "" | "quran" | "subject",
                      })
                    }
                    className={inputClass}
                  >
                    <option value="">Not set</option>
                    <option value="quran">Quran Teacher</option>
                    <option value="subject">Subject Teacher</option>
                  </select>
                </div>
              </div>

              {/* Subjects (only for subject teachers) */}
              {form.teacher_type === "subject" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Subjects
                  </label>
                  <div className="relative">
                    <BookOpen
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={form.subjects}
                      onChange={(e) => setForm({ ...form, subjects: e.target.value })}
                      placeholder="e.g. Maths, English, Urdu"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Bio
                </label>
                <div className="relative">
                  <FileText
                    size={18}
                    className="absolute left-3 top-4 text-gray-400"
                  />
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    rows={3}
                    placeholder="Short bio about this teacher..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm resize-none"
                  />
                </div>
              </div>

              {/* Is Public */}
              <label className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 cursor-pointer hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  checked={form.is_public}
                  onChange={(e) => setForm({ ...form, is_public: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <Eye size={18} className="text-gray-400" />
                <span className="text-sm text-gray-700">
                  Show on public Teachers page
                </span>
              </label>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-base !py-3.5 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
