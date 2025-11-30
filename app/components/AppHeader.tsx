"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AppHeaderProps {
  // au cas où plus tard tu veuilles cacher le "Bonjour, X"
  showGreeting?: boolean;
  // pour le menu burger mobile
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export default function AppHeader({
  showGreeting = true,
  mobileMenuOpen,
  onToggleMobileMenu,
}: AppHeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const email = localStorage.getItem("optipay_user_email");
    if (email) {
      const namePart = email.split("@")[0];
      const prettyName =
        namePart.charAt(0).toUpperCase() + namePart.slice(1);
      setUserName(prettyName);
    } else {
      setUserName("Alex");
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("optipay_user_email");
    }
    router.push("/login");
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Logo + titre */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-cyan-400 flex items-center justify-center font-bold text-slate-900">
            O
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">OptiPay</span>
            <span className="text-xs text-slate-400">
              La meilleure carte, à chaque paiement
            </span>
          </div>
        </div>

        {/* Zone droite DESKTOP */}
        <div className="hidden md:flex items-center gap-3 text-sm">
          {showGreeting && (
            <span className="text-slate-400">
              Bonjour, {userName || "Alex"}
            </span>
          )}
          <button className="px-3 py-1 rounded-lg border border-slate-700 text-xs hover:bg-slate-800">
            Mon compte
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-lg bg-slate-800 text-xs hover:bg-slate-700"
          >
            Déconnexion
          </button>
        </div>

        {/* Zone droite MOBILE : Déconnexion + burger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handleLogout}
            className="px-2 py-1 rounded-lg bg-slate-800 text-[11px] hover:bg-slate-700"
          >
            Déconnexion
          </button>

          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-2 py-1 text-slate-200"
            aria-label="Ouvrir le menu de navigation"
          >
            <div className="flex flex-col gap-[3px]">
              <span
                className={`h-[2px] w-4 rounded-full bg-slate-200 transition-transform ${
                  mobileMenuOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-4 rounded-full bg-slate-200 transition-opacity ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-[2px] w-4 rounded-full bg-slate-200 transition-transform ${
                  mobileMenuOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
