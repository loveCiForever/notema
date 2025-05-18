import React from "react";

export default function VerifyNoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold text-red-600 mb-4">
          Account Not Verified
        </h2>
        <p className="mb-4 text-sm text-zinc-700 dark:text-zinc-200">
          You need to verify your account before continuing. We've sent a
          verification email to your inbox.
          <br />
          Please check your inbox or spam folder and click the verification
          link.
        </p>
        <button
          className="mt-2 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
          onClick={onClose}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
