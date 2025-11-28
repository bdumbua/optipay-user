// app/privacy/page.tsx
"use client";

import AppLayout from "../components/AppLayout";

export default function PrivacyPage() {
  return (
    <AppLayout>
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm">
        <h1 className="text-xl font-semibold mb-2">
          Politique de confidentialité
        </h1>
        <p className="text-slate-400">
          Cette version de démonstration d&apos;OptiPay ne se connecte à
          aucun compte bancaire réel. Les données saisies (cartes, transactions)
          sont utilisées uniquement pour la simulation et l&apos;amélioration
          de l&apos;expérience utilisateur.
        </p>
        <p className="text-slate-400 mt-2">
          Dans les futures versions, toute intégration avec des services
          financiers ou des API d&apos;open banking sera réalisée dans le
          respect des normes de sécurité et de confidentialité en vigueur.
        </p>
      </section>
    </AppLayout>
  );
}
