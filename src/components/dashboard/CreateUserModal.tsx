"use client";

import { useState, useEffect } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useToast } from "./Toast";
import { passwordRules } from "@/lib/validation";
import CountryPhoneFields from "@/components/CountryPhoneFields";
import { findCountryByCode } from "@/lib/countries";
import type { UserRole } from "@/lib/supabase/types";

interface DefaultValues {
  full_name?: string;
  email?: string;
  phone?: string;
  country?: string;
}

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  defaultValues?: DefaultValues;
  invite?: boolean;
  callerRole?: UserRole;
}

const emptyForm = {
  full_name: "",
  email: "",
  password: "",
  role: "student" as "student" | "teacher" | "supervisor",
  phone: "",
  countryCode: "",
};

export default function CreateUserModal({
  isOpen,
  onClose,
  onCreated,
  defaultValues,
  invite = false,
  callerRole = "manager",
}: CreateUserModalProps) {
  const toast = useToast();
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isOpen && defaultValues) {
      setForm({
        ...emptyForm,
        full_name: defaultValues.full_name || "",
        email: defaultValues.email || "",
        phone: defaultValues.phone || "",
        countryCode: "",
      });
    } else if (isOpen) {
      setForm(emptyForm);
    }
  }, [isOpen, defaultValues]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const rules = passwordRules.map((r) => ({
    label: r.label,
    met: r.test(form.password),
  }));
  const allRulesMet = rules.every((r) => r.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!invite && !allRulesMet) {
      toast.error("Please meet all password requirements");
      return;
    }

    setLoading(true);

    const countryName = findCountryByCode(form.countryCode)?.name || form.countryCode;
    const body: Record<string, unknown> = {
      full_name: form.full_name,
      email: form.email,
      role: form.role,
      phone: form.phone,
      country: countryName,
    };

    if (invite) {
      body.invite = true;
    } else {
      body.password = form.password;
    }

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(json.error || "Failed to create user");
      return;
    }

    toast.success(
      invite
        ? `Invite email sent to "${form.email}"`
        : `User "${form.full_name}" created successfully`
    );
    setForm(emptyForm);
    onCreated();
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
            {invite ? "Invite User" : "Create User"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
                required
                placeholder="John Doe"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email *
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                placeholder="user@email.com"
                className={inputClass}
              />
            </div>
          </div>

          {invite ? (
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-700">
              An invite email will be sent to this address. The user will set
              their own password when they first log in.
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                    placeholder="Enter password"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password rules */}
              <div className="space-y-1.5">
                {rules.map((rule) => (
                  <div
                    key={rule.label}
                    className={`flex items-center gap-2 text-xs ${
                      rule.met ? "text-green-600" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        rule.met
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {rule.met && (
                        <svg
                          viewBox="0 0 12 12"
                          className="w-2.5 h-2.5 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </div>
                    {rule.label}
                  </div>
                ))}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Role *
            </label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({
                  ...form,
                  role: e.target.value as "student" | "teacher" | "supervisor",
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition text-sm"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              {callerRole === "manager" && (
                <option value="supervisor">Supervisor</option>
              )}
            </select>
          </div>

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

          <button
            type="submit"
            disabled={loading || (!invite && !allRulesMet)}
            className="btn-primary w-full text-base !py-3.5 disabled:opacity-50"
          >
            {loading
              ? invite
                ? "Sending Invite..."
                : "Creating..."
              : invite
                ? "Send Invite Email"
                : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
}
