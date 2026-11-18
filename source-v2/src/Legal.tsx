import { useEffect } from "react";
import { X } from "lucide-react";
import { SITE } from "@/config/site";

export type LegalKind = "mentions-legales" | "confidentialite";

export default function Legal({ kind, onClose }: { kind: LegalKind; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const h2 = "mt-8 font-display text-lg font-bold text-navy";
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-deep/70 p-4 md:p-10" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={onClose}>
      <div className="relative mx-auto max-w-3xl rounded-2xl bg-card p-6 text-foreground shadow-card md:p-10" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-mist-2 text-navy hover:bg-mist" aria-label="Fermer">
          <X className="h-5 w-5" aria-hidden />
        </button>
        {kind === "mentions-legales" ? (
          <>
            <h1 id="legal-title" className="pr-12 text-2xl font-extrabold text-navy md:text-3xl">Mentions légales</h1>
            <h2 className={h2}>Éditeur du site</h2>
            <p className="mt-2">{SITE.fullName} – {SITE.legalName}, SAS au capital de {SITE.capital}<br />
              Siège : {SITE.address}, {SITE.city}<br />
              RCS Montpellier {SITE.siren} · SIRET {SITE.siret} · TVA {SITE.tva}<br />
              Téléphone : {SITE.phone} · E-mail : {SITE.email}</p>
            <h2 className={h2}>Directeur de la publication</h2>
            <p className="mt-2">{SITE.president}, Président.</p>
            <h2 className={h2}>Activité réglementée</h2>
            <p className="mt-2">Activité de surveillance et de gardiennage exercée sous l'autorisation d'exercice CNAPS n° {SITE.cnaps}.
              « L'autorisation d'exercice délivrée par le CNAPS ne confère aucune prérogative de puissance publique à l'entreprise ou aux personnes qui en bénéficient. » (article L.612-14 du Code de la sécurité intérieure)</p>
            <h2 className={h2}>Hébergement</h2>
            <p className="mt-2">GitHub Pages – GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.</p>
            <h2 className={h2}>Propriété intellectuelle</h2>
            <p className="mt-2">Les textes, le logo et les éléments graphiques de ce site sont la propriété de {SITE.legalName}. Toute reproduction sans autorisation écrite est interdite.</p>
          </>
        ) : (
          <>
            <h1 id="legal-title" className="pr-12 text-2xl font-extrabold text-navy md:text-3xl">Politique de confidentialité</h1>
            <h2 className={h2}>Données collectées</h2>
            <p className="mt-2">Les formulaires de devis et de candidature recueillent votre nom, votre société, votre téléphone, votre e-mail, la ville du site et votre message. Ces données servent uniquement à répondre à votre demande.</p>
            <h2 className={h2}>Responsable du traitement</h2>
            <p className="mt-2">{SITE.legalName}, {SITE.address}, {SITE.city} – {SITE.email}.</p>
            <h2 className={h2}>Base légale et durée de conservation</h2>
            <p className="mt-2">Le traitement repose sur votre consentement et sur des mesures précontractuelles prises à votre demande. Les données sont conservées 3 ans après le dernier contact, puis supprimées.</p>
            <h2 className={h2}>Destinataires</h2>
            <p className="mt-2">Vos données sont destinées à la seule équipe de {SITE.fullName}. Elles ne sont ni vendues ni cédées.</p>
            <h2 className={h2}>Vos droits</h2>
            <p className="mt-2">Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de limitation. Écrivez à {SITE.email}. Vous pouvez aussi saisir la CNIL (cnil.fr).</p>
            <h2 className={h2}>Cookies</h2>
            <p className="mt-2">Ce site ne dépose aucun cookie de mesure d'audience ni de publicité.</p>
          </>
        )}
      </div>
    </div>
  );
}
