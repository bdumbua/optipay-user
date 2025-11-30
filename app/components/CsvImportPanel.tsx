// app/components/CsvImportPanel.tsx
"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";

type CsvImportPanelProps = {
  selectedCardId: number | null;
};

export default function CsvImportPanel({ selectedCardId }: CsvImportPanelProps) {
  const [showHelp, setShowHelp] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (selectedCardId == null) {
      alert(
        "Veuillez d'abord sélectionner une carte dans le filtre au-dessus avant d'importer un CSV."
      );
      return;
    }

    setFileName(file.name);

    // 🔹 MVP : traitement simulé seulement
    // Plus tard : appel à ton backend d'import CSV ici
    console.log("Fichier sélectionné pour la carte", selectedCardId, file.name);
  };

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold mb-1">
            Importer un relevé bancaire (CSV)
          </h2>
          <p className="text-xs text-slate-400">
            L&apos;importation s&apos;applique à la <span className="font-medium">carte actuellement sélectionnée</span>{" "}
            dans le filtre ci-dessus, comme pour l&apos;historique des transactions.
          </p>

          {selectedCardId != null ? (
            <p className="text-xs text-emerald-400 mt-1">
              Carte ciblée : <span className="font-semibold">#{selectedCardId}</span> (les lignes du CSV seront
              rattachées à cette carte dans l&apos;historique ci-dessous).
            </p>
          ) : (
            <p className="text-xs text-rose-300 mt-1">
              Aucune carte sélectionnée — choisissez une carte pour pouvoir importer son relevé CSV.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowHelp((v) => !v)}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 underline-offset-4 hover:underline"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          {showHelp ? "Masquer l’aide" : "Format CSV attendu"}
        </button>
      </div>

      {showHelp && (
        <div className="mt-3 rounded-xl border border-slate-700 bg-slate-950/60 p-3 text-xs text-slate-300 space-y-2">
          <p className="font-medium text-slate-100">
            Format minimal recommandé du fichier CSV :
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Le fichier doit contenir une ligne d&apos;entête.</li>
            <li>
              Colonnes minimales suggérées :
              <span className="block ml-4 mt-1">
                <code className="bg-slate-900 px-1.5 py-0.5 rounded text-[11px]">
                  date, description, montant, devise
                </code>
              </span>
            </li>
            <li>
              La date peut être au format{" "}
              <code className="bg-slate-900 px-1 py-0.5 rounded text-[11px]">
                YYYY-MM-DD
              </code>{" "}
              ou{" "}
              <code className="bg-slate-900 px-1 py-0.5 rounded text-[11px]">
                YYYY-MM-DD HH:MM
              </code>.
            </li>
            <li>
              Le montant doit être un nombre avec un point comme séparateur
              décimal (ex. <code>123.45</code>).
            </li>
          </ul>

          <div className="mt-2">
            <p className="text-slate-400">Exemple de contenu CSV :</p>
            <pre className="mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 overflow-x-auto text-[11px] leading-snug">
{`date,description,montant,devise
2025-03-01,Épicerie Super C,85.32,CAD
2025-03-02,Café Tim Hortons,4.75,CAD
2025-03-03,Abonnement Netflix,16.99,CAD`}
            </pre>
          </div>

          <p className="text-[11px] text-slate-500">
            Dans une version ultérieure, OptiPay pourra détecter automatiquement la carte en fonction du relevé.
          </p>
        </div>
      )}

      <div className="mt-4">
        <label
          className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium cursor-pointer
            ${
              selectedCardId != null
                ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                : "bg-slate-800 text-slate-600 cursor-not-allowed"
            }`}
        >
          Choisir un fichier CSV
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileChange}
            disabled={selectedCardId == null}
          />
        </label>

        {fileName && (
          <div className="mt-3 text-xs text-slate-300">
            Fichier sélectionné : <span className="font-medium">{fileName}</span>
          </div>
        )}
      </div>
    </section>
  );
}
