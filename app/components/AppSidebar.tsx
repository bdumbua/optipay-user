"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Tableau de bord" },
  { href: "/cards", label: "Mes cartes" },
  { href: "/transactions", label: "Transactions" },
  { href: "/recommendations", label: "Recommandations" },
  { href: "/learning", label: "Formations finances" },
  { href: "/help", label: "Aide & Support" },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex w-56 flex-col gap-2 text-sm">
      <div className="text-xs uppercase text-slate-500 mb-1">Navigation</div>

      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors " +
              (isActive
                ? "bg-slate-900 text-cyan-300"
                : "hover:bg-slate-900 text-slate-200")
            }
          >
            <span
              className={
                "h-1.5 w-1.5 rounded-full " +
                (isActive ? "bg-cyan-400" : "bg-slate-600")
              }
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
