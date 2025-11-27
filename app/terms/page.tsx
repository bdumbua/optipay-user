import AppHeader from "../components/AppHeader";
import AppSidebar from "../components/AppSidebar";
import AppFooter from "../components/AppFooter";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <AppHeader />

      <div className="max-w-6xl mx-auto px-4 py-6 flex-1 flex gap-6">
        <AppSidebar />
        <main className="flex-1 flex flex-col gap-4 text-sm">
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
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
        </main>
      </div>

      <AppFooter />
    </div>
  );
}
