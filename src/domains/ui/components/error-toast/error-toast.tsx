"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface ErrorToastProps {
  error: Error | null;
  onClose: () => void;
  duration?: number;
}

export default function ErrorToast({
  error,
  onClose,
  duration = 5000,
}: ErrorToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    if (error) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [error, duration, onClose]);

  if (!error) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      }`}
    >
      <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg max-w-md">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold mb-1">{t("title")}</h4>
            <p className="text-sm text-red-100">{error.message}</p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="ml-4 text-red-200 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
