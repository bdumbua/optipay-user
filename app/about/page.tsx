import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/AppSidebar";
import AppFooter from "../components/AppFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <AppHeader />

      <div className="max-w-6xl mx-auto px-4 py-6 flex-1 flex gap-6">
        <AppSidebar />
        <main className="flex-1 flex flex-col gap-4 text-sm">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
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
        </main>
      </div>

      <AppFooter />
    </div>
  );
}
