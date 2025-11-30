// app/components/AppLayout.tsx
"use client";

import { useState } from "react";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <AppHeader
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
      />

      {/* Menu mobile déroulant (en dessous du header) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* On réutilise le même sidebar en version "stack" */}
            <AppSidebar />
          </div>
        </div>
      )}

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
          {/* Sidebar desktop */}
          <aside className="w-60 shrink-0 hidden md:block">
            <AppSidebar />
          </aside>

          {/* CONTENT AREA */}
          <main className="flex-1 flex flex-col gap-4">
            {children}
          </main>
        </div>
      </div>

      {/* FOOTER */}
      <AppFooter />
    </div>
  );
}
