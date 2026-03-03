"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import EditProfileModal from "@/components/dashboard/EditProfileModal";

interface ProfileNameEditorProps {
  initialName: string;
}

export default function ProfileNameEditor({
  initialName,
}: ProfileNameEditorProps) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(initialName);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-500 mb-1">
        Display Name
      </label>
      <div className="flex items-center gap-2">
        <span className="text-gray-900 font-medium">{name || "—"}</span>
        <button
          onClick={() => setShowModal(true)}
          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-primary-600 transition"
          title="Edit name"
        >
          <Pencil size={14} />
        </button>
      </div>

      <EditProfileModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        initialName={name}
        onUpdated={(newName) => {
          setName(newName);
          router.refresh();
        }}
      />
    </div>
  );
}
