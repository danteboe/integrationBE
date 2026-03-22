"use client";

import { useEffect, useMemo, useState } from "react";
import { getToastEventName } from "@/lib/toast";

type ToastItem = {
  id: number;
  message: string;
};

const TOAST_LIFETIME_MS = 2500;

export default function ToastHost() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const eventName = useMemo(() => getToastEventName(), []);

  useEffect(() => {
    function onToast(event: Event) {
      const custom = event as CustomEvent<{ message?: string }>;
      const message = custom.detail?.message;
      if (!message) return;

      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev, { id, message }]);

      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, TOAST_LIFETIME_MS);
    }

    window.addEventListener(eventName, onToast);
    return () => window.removeEventListener(eventName, onToast);
  }, [eventName]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 shadow-md"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
