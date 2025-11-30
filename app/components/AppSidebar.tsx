"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  ReceiptText,
  Sparkles,
  GraduationCap,
  HelpCircle,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    label: "Tableau de bord",
    icon: LayoutDashboard,
  },
  {
    href: "/cards",
    label: "Mes cartes",
    icon: CreditCard,
  },
  {
    href: "/transactions",
    label: "Transactions",
    icon: ReceiptText,
  },
  {
    href: "/recommendations",
    label: "Recommandations",
    icon: Sparkles,
  },
  {
    href: "/learning",
    label: "Formations finances",
    icon: GraduationCap,
  },
  {
    href: "/help",
    label: "Aide & Support",
    icon: HelpCircle,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 text-sm">
      <div className="text-xs uppercase text-slate-500 mb-1">
        Navigation
      </div>

      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;

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
                "flex h-6 w-6 items-center justify-center rounded-lg border " +
                (isActive
                  ? "border-cyan-500/60 bg-cyan-500/10"
                  : "border-slate-700 bg-slate-950")
              }
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
