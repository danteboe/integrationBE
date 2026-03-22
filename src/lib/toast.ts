"use client";

const TOAST_EVENT = "app-toast";

export function showSuccessToast(message: string) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: {
        message,
        type: "success",
      },
    })
  );
}

export function getToastEventName() {
  return TOAST_EVENT;
}
