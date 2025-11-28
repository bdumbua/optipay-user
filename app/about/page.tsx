// app/about/page.tsx
"use client";

import AppLayout from "../components/AppLayout";

export default function AboutPage() {
  return (
    <AppLayout>
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm">
        <h1 className="text-xl font-semibold mb-2">À propos d&apos;OptiPay</h1>
        <p className="text-slate-400">
          OptiPay est un copilote financier intelligent qui vous aide à
          choisir la meilleure carte de crédit pour chaque paiement, afin
          d&apos;optimiser vos récompenses et réduire vos frais.
        </p>
        <p className="text-slate-400 mt-2">
          Le projet a été créé avec l&apos;ambition d&apos;offrir un outil
          simple, transparent et centré sur l&apos;utilisateur, combinant
          intelligence artificielle et éducation financière.
        </p>
      </section>
    </AppLayout>
  );
}
