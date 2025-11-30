"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthFooter } from "../components/AuthFooter";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const email = emailInput?.value.trim() || "";

    if (!emailRegex.test(email)) {
      setEmailError("Veuillez saisir une adresse email valide.");
      return;
    } else {
      setEmailError("");
    }

    if (email) {
      localStorage.setItem("optipay_user_email", email);
    }

    // Pour le MVP, on redirige directement vers le dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 mx-4">
          {/* Logo + titre */}
          <div className="flex items-center gap-3 mb-2">
            <div className="h-9 w-9 rounded-xl bg-cyan-400 flex items-center justify-center font-bold text-slate-900">
              O
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-lg">OptiPay</span>
              <span className="text-xs text-slate-400">
                Crée ton compte OptiPay
              </span>
              <p className="text-xs text-slate-500">
                (Aperçu UI - Version Beta.)
              </p>
            </div>
          </div>

          <h1 className="text-lg font-semibold">Créer un compte</h1>

          <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
            <div>
              <label className="block text-slate-400 mb-1">Nom complet</label>
              <input
                type="text"
                name="fullName"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Adresse email</label>
              <input
                type="email"
                name="email"
                className={`w-full rounded-xl border bg-slate-950 px-3 py-2 text-sm ${
                  emailError ? "border-red-500" : "border-slate-700"
                }`}
                placeholder="vous@example.com"
              />
              {emailError && (
                <p className="mt-1 text-[11px] text-red-400">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm pr-16"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center text-[11px] text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
            >
              Créer mon compte
            </button>

            <p className="text-xs text-slate-400 text-center">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-cyan-300 hover:underline">
                Se connecter
              </Link>
            </p>
          </form>

          <p className="text-xs text-slate-500">
            (Pour le MVP, la création de compte est fictive et redirige vers le tableau de bord.)
          </p>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
