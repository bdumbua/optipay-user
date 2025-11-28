"use client";

import type { ReactNode } from "react";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* HEADER global */}
      <AppHeader />

      {/* CONTENU PRINCIPAL */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex-1 flex gap-6">
        {/* SIDEBAR globale */}
        <AppSidebar />

        {/* CONTENU spécifique à la page */}
        <main className="flex-1 flex flex-col gap-4">
          {children}
        </main>
      </div>

      {/* FOOTER global */}
      <AppFooter />
    </div>
  );
}
