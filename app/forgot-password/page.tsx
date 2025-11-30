"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthFooter } from "../components/AuthFooter";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const email = emailInput?.value.trim() || "";

    if (!emailRegex.test(email)) {
      setEmailError("Veuillez saisir une adresse email valide.");
      setSubmitted(false);
      return;
    } else {
      setEmailError("");
    }

    // MVP : on ne fait qu'afficher un message de confirmation
    setSubmitted(true);
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
                Réinitialisation du mot de passe
              </span>
              <p className="text-xs text-slate-500">
                (Aperçu UI - Version Beta.)
              </p>
            </div>
          </div>

          <h1 className="text-lg font-semibold">Mot de passe oublié</h1>

          <p className="text-xs text-slate-400">
            Saisissez l&apos;adresse email associée à votre compte. Nous vous
            enverrons un lien pour réinitialiser votre mot de passe.
          </p>

          <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
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

            <button
              type="submit"
              className="w-full mt-1 px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 text-sm font-medium hover:bg-cyan-300"
            >
              Envoyer le lien
            </button>
          </form>

          {submitted && (
            <p className="text-xs text-emerald-400 mt-2">
              Si un compte OptiPay existe avec cet email, un lien de
              réinitialisation a été envoyé.
            </p>
          )}

          <div className="pt-2 text-xs">
            <Link href="/login" className="text-cyan-300 hover:underline">
              ← Retour à la connexion
            </Link>
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
