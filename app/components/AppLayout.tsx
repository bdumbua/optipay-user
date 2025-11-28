// app/components/AppLayout.tsx
"use client";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      {/* HEADER */}
      <AppHeader />

      {/* MAIN CONTAINER */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
          {/* SIDEBAR */}
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
