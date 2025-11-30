// app/components/Alert.tsx
"use client";

import React, { JSX } from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

type AlertKind = "success" | "warning" | "error";

type AlertProps = {
  kind: AlertKind;
  children: React.ReactNode;
  onClose?: () => void;
};

export default function Alert({ kind, children, onClose }: AlertProps) {
  const base =
    "mb-3 rounded-xl border px-3 py-2 text-xs flex items-start gap-2 shadow-sm shadow-slate-950/50 bg-slate-950/80";

  const byKind: Record<AlertKind, string> = {
    success: "border-emerald-500/40 text-emerald-100",
    warning: "border-amber-500/40 text-amber-100",
    error: "border-rose-500/40 text-rose-100",
  };

  const iconByKind: Record<AlertKind, JSX.Element> = {
    success: (
      <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-[1px]" />
    ),
    warning: (
      <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-[1px]" />
    ),
    error: (
      <XCircle className="h-4 w-4 text-rose-400 flex-shrink-0 mt-[1px]" />
    ),
  };

  return (
    <div className={`${base} ${byKind[kind]}`}>
      <span>{iconByKind[kind]}</span>
      <div className="flex-1 leading-snug">{children}</div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 text-[10px] text-slate-400 hover:text-slate-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}
