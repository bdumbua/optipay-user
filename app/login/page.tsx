"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const email = emailInput?.value || "";

    // stocker l'email du "user"
    if (email) {
      localStorage.setItem("optipay_user_email", email);
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-50">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 mx-4">
        {/* Logo + titre */}
        <div className="flex items-center gap-3 mb-2">
          <div className="h-9 w-9 rounded-xl bg-cyan-400 flex items-center justify-center font-bold text-slate-900">
            O
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-lg">OptiPay</span>
            <span className="text-xs text-slate-400">
              La meilleure carte, à chaque paiement
            </span>
            <p className="text-xs text-slate-500">
              (Aperçu UI - Version Beta.)
            </p>
          </div>
        </div>

        <h1 className="text-lg font-semibold">Connexion</h1>

        {/* Formulaire */}
        <form className="space-y-3 text-sm" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-400 mb-1">Adresse email</label>
            <input
              type="email"
              name="email"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
              placeholder="vous@example.com"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Mot de passe</label>
            <input
              type="password"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
          >
            Se connecter
          </button>
        </form>

        <p className="text-xs text-slate-500">
          (Pour le MVP, vous pouvez accéder directement au tableau de bord sans
          authentification réelle.)
        </p>

        <div className="pt-2">
          <Link
            href="/dashboard"
            className="text-xs text-cyan-300 hover:underline"
          >
            Continuer vers le tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}
