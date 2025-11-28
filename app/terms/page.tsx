// app/terms/page.tsx
"use client";

import AppLayout from "../components/AppLayout";

export default function TermsPage() {
  return (
    <AppLayout>
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-sm">
        <h1 className="text-xl font-semibold mb-2">
          Conditions d&apos;utilisation
        </h1>
        <p className="text-slate-400">
          OptiPay est fourni à titre expérimental et éducatif. Les
          recommandations proposées ne constituent pas des conseils
          financiers personnalisés et ne remplacent pas l&apos;avis d&apos;un
          professionnel.
        </p>
        <p className="text-slate-400 mt-2">
          En utilisant OptiPay, vous acceptez d&apos;utiliser l&apos;outil
          sous votre propre responsabilité et de vérifier les informations
          importantes auprès de votre institution financière.
        </p>
      </section>
    </AppLayout>
  );
}
