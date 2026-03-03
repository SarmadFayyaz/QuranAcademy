"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import ChangePasswordModal from "@/components/dashboard/ChangePasswordModal";

export default function ChangePasswordButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-primary-300 hover:text-primary-600 transition"
      >
        <Lock size={16} />
        Change Password
      </button>

      <ChangePasswordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
