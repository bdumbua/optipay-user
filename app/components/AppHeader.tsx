"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AppHeaderProps {
  // au cas où plus tard tu veuilles cacher le "Bonjour, X"
  showGreeting?: boolean;
}

export default function AppHeader({ showGreeting = true }: AppHeaderProps) {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
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
    localStorage.removeItem("optipay_user_email");
    router.push("/login");
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-cyan-400 flex items-center justify-center font-bold text-slate-900">
            O
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">OptiPay</span>
            <span className="text-xs text-slate-400">
              La carte virtuelle, propulsée par l’IA
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {showGreeting && (
            <span className="text-slate-400 hidden sm:inline">
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
      </div>
    </header>
  );
}
