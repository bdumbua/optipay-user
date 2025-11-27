import Link from "next/link";

export default function AppFooter() {
  return (
    <footer className="border-t border-slate-800 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} OptiPay. Tous droits réservés.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {/* Lien vers ton site marketing OptiPay (adapter l'URL) */}
          <a
            href="https://optipay.ca"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-300"
          >
            Site OptiPay
          </a>
          <span className="h-3 w-px bg-slate-700 hidden sm:inline" />
          <Link href="/about" className="hover:text-cyan-300">
            À propos
          </Link>
          <Link href="/privacy" className="hover:text-cyan-300">
            Confidentialité
          </Link>
          <Link href="/terms" className="hover:text-cyan-300">
            Conditions d&apos;utilisation
          </Link>
        </div>
      </div>
    </footer>
  );
}
