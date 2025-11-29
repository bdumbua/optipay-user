// app/components/Alert.tsx
"use client";

import React from "react";

type AlertKind = "success" | "warning" | "error";

type AlertProps = {
  kind: AlertKind;
  children: React.ReactNode;
};

export default function Alert({ kind, children }: AlertProps) {
  const base =
    "mb-3 rounded-xl border px-3 py-2 text-xs flex items-start gap-2";

  const byKind: Record<AlertKind, string> = {
    success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
    warning: "border-amber-500/40 bg-amber-500/10 text-amber-100",
    error: "border-rose-500/40 bg-rose-500/10 text-rose-100",
  };

  return (
    <div className={`${base} ${byKind[kind]}`}>
      {/* tu peux ajouter une petite icône un jour */}
      <div>{children}</div>
    </div>
  );
}
