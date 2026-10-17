import { useState, type FormEvent } from "react";
import {
  ShieldCheck, Clock, FileText, BadgeCheck, Phone, Mail, MapPin, Menu, X, Building2, Store,
  HardHat, Warehouse, Home, Landmark, PartyPopper, Users, Eye, Footprints, KeyRound, Construction,
  ShoppingBag, ChevronDown, ArrowRight, Check, Zap, UserCheck, Handshake,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { SITE } from "@/config/site";

const SERVICES = [
  { id: "gardiennage", icon: ShieldCheck, title: "Gardiennage", desc: "Présence d'agents de sécurité qualifiés sur votre site pour prévenir intrusions, vols et dégradations.", pts: ["Poste fixe de jour ou de nuit", "Main courante et consignes sur mesure"] },
  { id: "rondes", icon: Footprints, title: "Rondes de surveillance", desc: "Passages réguliers ou aléatoires d'agents pour vérifier l'intégrité de vos locaux.", pts: ["Contrôle des accès et fermetures", "Compte rendu après chaque ronde"] },
  { id: "acces", icon: KeyRound, title: "Contrôle d'accès", desc: "Filtrage des entrées, accueil des visiteurs et gestion des badges selon vos procédures.", pts: ["Accueil et orientation", "Gestion des registres d'entrée"] },
  { id: "chantier", icon: Construction, title: "Surveillance de chantier", desc: "Protection de vos matériaux, engins et installations contre le vol et le vandalisme.", pts: ["Surveillance nuit et week-end", "Adaptée aux phases du chantier"] },
  { id: "evenementiel", icon: PartyPopper, title: "Sécurité événementielle", desc: "Encadrement de vos salons, soirées, manifestations sportives ou culturelles.", pts: ["Filtrage et palpation", "Gestion des flux du public"] },
  { id: "magasin", icon: ShoppingBag, title: "Surveillance de magasin", desc: "Agents de prévention en surface de vente pour dissuader la démarque et rassurer vos équipes.", pts: ["Prévention des vols", "Présence dissuasive et discrète"] },
];
const SECTORS = [
  [Building2, "Bureaux et entreprises"], [Store, "Commerces"], [HardHat, "Chantiers BTP"], [Warehouse, "Entrepôts et logistique"],
  [Home, "Résidences et copropriétés"], [Landmark, "Collectivités"], [PartyPopper, "Événements"], [Users, "Établissements recevant du public"],
] as const;
const HOURS = ["Nuit", "Jour", "24 h/24", "Week-end", "Ponctuel"];
const FAQ = [
  ["Vos agents sont-ils habilités ?", "Oui. Tous nos agents sont titulaires d'une carte professionnelle délivrée par le CNAPS (Conseil national des activités privées de sécurité), condition obligatoire pour exercer une activité de sécurité privée en France."],
  ["Quel est votre délai d'intervention ?", "Nous répondons à toute demande de devis sous 24 h. Pour un besoin urgent, appelez-nous directement : nous étudions avec vous la mise en place d'un agent dans les meilleurs délais."],
  ["Comment est calculé le tarif ?", "Le tarif dépend du nombre d'agents, du volume horaire, des créneaux (nuit, week-end, jours fériés) et des spécificités du site. Après analyse de votre besoin, nous vous remettons une proposition détaillée et gratuite."],
  ["Intervenez-vous en dehors de Montpellier ?", "Oui, nous intervenons dans tout le département de l'Hérault et plus largement en Occitanie. Contactez-nous pour vérifier la faisabilité sur votre site."],
  ["Que contient le compte rendu ?", "Après chaque vacation, vous recevez un rapport précisant les horaires de présence, les rondes effectuées, les événements constatés et les actions menées par l'agent."],
];

type Form = { services: string[]; name: string; company: string; phone: string; email: string; city: string; hours: string[]; message: string };
const empty: Form = { services: [], name: "", company: "", phone: "", email: "", city: "", hours: [], message: "" };

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="2M Sécurité, retour en haut de page">
      <img src={logo} alt="" width={44} height={47} className="h-11 w-auto" />
      <span className="leading-tight">
        <span className={`block font-display text-lg font-extrabold ${light ? "text-primary-foreground" : "text-navy"}`}>2M Sécurité</span>
        <span className={`block text-xs ${light ? "text-mist" : "text-muted-foreground"}`}>Gardiennage & surveillance</span>
      </span>
    </a>
  );
}

function SectionHead({ k, t, d, light }: { k: string; t: string; d?: string; light?: boolean }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="font-display text-sm font-bold uppercase tracking-widest text-periwinkle">{k}</p>
      <h2 className={`mt-3 text-3xl font-extrabold md:text-4xl ${light ? "text-primary-foreground" : "text-navy"}`}>{t}</h2>
      {d && <p className={`mt-4 text-lg ${light ? "text-mist" : "text-muted-foreground"}`}>{d}</p>}
    </div>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);
  const [quick, setQuick] = useState({ service: "", city: "" });

  const toggle = (k: "services" | "hours", v: string) =>
    setForm((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));
  const goForm = () => document.getElementById("devis")?.scrollIntoView();
  const pick = (id: string) => {
    setForm((f) => ({ ...f, services: f.services.includes(id) ? f.services : [...f.services, id] }));
    goForm();
  };

  const validate = (f: Form) => {
    const e: typeof errors = {};
    if (!f.name.trim()) e.name = "Veuillez indiquer votre nom.";
    else if (f.name.length > 100) e.name = "100 caractères maximum.";
    if (!/^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(f.phone.trim())) e.phone = "Veuillez saisir un numéro de téléphone valide.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()) || f.email.length > 255) e.email = "Veuillez saisir une adresse e-mail valide.";
    if (f.message.length > 1000) e.message = "1000 caractères maximum.";
    return e;
  };
  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    setSent(true);
  };

  const nav = [["Prestations", "#prestations"], ["Secteurs", "#secteurs"], ["Notre méthode", "#methode"], ["FAQ", "#faq"]];
  const input = "w-full rounded-lg border border-input bg-background px-4 py-3 text-foreground focus:border-periwinkle focus:outline-none focus:ring-2 focus:ring-periwinkle/40";
  const chip = (on: boolean) => `rounded-full border px-4 py-2 text-sm font-semibold transition ${on ? "border-navy bg-navy text-primary-foreground" : "border-input bg-background text-navy hover:border-periwinkle"}`;

  return (
    <div id="top" className="pb-20 lg:pb-0">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-3">Aller au contenu</a>

      {/* Top bar */}
      <div className="bg-navy-deep text-sm text-mist">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-4 py-2 md:justify-between">
          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-periwinkle" aria-hidden />{SITE.zone}</span>
          <span className="hidden items-center gap-2 sm:flex"><Clock className="h-4 w-4 text-periwinkle" aria-hidden />Agents disponibles 24 h/24, 7 j/7</span>
          <a href={`mailto:${SITE.email}`} className="hidden items-center gap-2 hover:text-primary-foreground md:flex"><Mail className="h-4 w-4 text-periwinkle" aria-hidden />{SITE.email}</a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Logo />
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex gap-8 font-display text-sm font-semibold text-navy">
              {nav.map(([l, h]) => <li key={h}><a href={h} className="hover:text-periwinkle">{l}</a></li>)}
            </ul>
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <a href={SITE.phoneHref} className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-mist-2 text-navy"><Phone className="h-5 w-5" aria-hidden /></span>
              <span className="leading-tight"><span className="block text-xs text-muted-foreground">Une urgence ?</span><span className="font-display font-bold text-navy">{SITE.phone}</span></span>
            </a>
            <a href="#devis" className="rounded-lg bg-navy px-5 py-3 font-display text-sm font-bold text-primary-foreground hover:bg-navy-deep">Devis gratuit</a>
          </div>
          <button className="rounded-lg p-2 text-navy lg:hidden" aria-expanded={menu} aria-controls="mnav" aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"} onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav id="mnav" aria-label="Navigation mobile" className="border-t bg-background px-4 pb-4 lg:hidden">
            <ul className="flex flex-col font-display font-semibold text-navy">
              {nav.map(([l, h]) => <li key={h}><a href={h} onClick={() => setMenu(false)} className="block border-b py-3">{l}</a></li>)}
            </ul>
            <a href="#devis" onClick={() => setMenu(false)} className="mt-4 block rounded-lg bg-navy py-3 text-center font-display font-bold text-primary-foreground">Devis gratuit</a>
          </nav>
        )}
      </header>

      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden bg-navy text-primary-foreground">
          <div className="hero-grid absolute inset-0" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
          <div className="diag-br absolute -bottom-10 right-0 h-2/3 w-1/2 bg-periwinkle/25" aria-hidden />
          <div className="diag-tl absolute left-0 top-0 h-40 w-40 bg-navy-deep md:h-64 md:w-64" aria-hidden />
          <div className="tri absolute left-[45%] top-16 h-6 w-7 bg-tri/30" aria-hidden />
          <div className="tri absolute bottom-24 left-[10%] h-4 w-5 bg-tri/30" aria-hidden />
          <div className="tri absolute right-[8%] top-10 h-5 w-6 rotate-180 bg-periwinkle/50" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-[1.3fr_1fr]">
            <div className="fade-up">
              <p className="inline-flex items-center gap-2 rounded-full border border-periwinkle/40 bg-navy-deep/50 px-4 py-1.5 text-sm font-semibold text-mist">
                <ShieldCheck className="h-4 w-4 text-periwinkle" aria-hidden />Agence de sécurité privée à Montpellier
              </p>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] md:text-6xl">
                Votre sécurité, <span className="text-periwinkle">notre engagement</span> jour et nuit
              </h1>
              <p className="mt-6 max-w-xl text-lg text-mist">
                Gardiennage, rondes de surveillance, contrôle d'accès et sécurité événementielle : des agents qualifiés pour protéger vos biens, vos équipes et votre public dans l'Hérault et en Occitanie.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#devis" className="inline-flex items-center justify-center gap-2 rounded-lg bg-periwinkle px-6 py-4 font-display font-bold text-navy-deep hover:bg-mist-2">Demander un devis gratuit <ArrowRight className="h-5 w-5" aria-hidden /></a>
                <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-foreground/30 px-6 py-4 font-display font-bold hover:bg-primary-foreground/10"><Phone className="h-5 w-5" aria-hidden />{SITE.phone}</a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-mist">
                {["Agents carte pro CNAPS", "Réponse sous 24 h", "Entreprise locale"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-periwinkle" aria-hidden />{t}</li>
                ))}
              </ul>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setForm((f) => ({ ...f, services: quick.service && !f.services.includes(quick.service) ? [...f.services, quick.service] : f.services, city: quick.city || f.city })); goForm(); }}
              className="fade-up rounded-2xl bg-card p-6 text-card-foreground shadow-card md:p-8" aria-labelledby="qtitle">
              <h2 id="qtitle" className="text-2xl font-extrabold text-navy">Devis express</h2>
              <p className="mt-1 text-sm text-muted-foreground">Gratuit et sans engagement, réponse sous 24 h.</p>
              <label htmlFor="q-s" className="mt-6 block text-sm font-semibold text-navy">Prestation souhaitée</label>
              <select id="q-s" className={`${input} mt-2`} value={quick.service} onChange={(e) => setQuick({ ...quick, service: e.target.value })}>
                <option value="">Choisir une prestation</option>
                {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
              <label htmlFor="q-c" className="mt-4 block text-sm font-semibold text-navy">Ville du site</label>
              <input id="q-c" className={`${input} mt-2`} placeholder="Ex. Montpellier" maxLength={100} value={quick.city} onChange={(e) => setQuick({ ...quick, city: e.target.value })} />
              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-4 font-display font-bold text-primary-foreground hover:bg-navy-deep">Continuer ma demande <ArrowRight className="h-5 w-5" aria-hidden /></button>
            </form>
          </div>
        </section>

        {/* Guarantees */}
        <section aria-label="Nos garanties" className="border-b bg-mist-2">
          <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {[[BadgeCheck, "Agents certifiés", "Carte professionnelle CNAPS"], [Clock, "24 h/24, 7 j/7", "Jour, nuit, week-end et jours fériés"], [Zap, "Devis sous 24 h", "Gratuit et sans engagement"], [FileText, "Rapports détaillés", "Après chaque vacation"]].map(([I, t, d]) => {
              const Icon = I as typeof Clock;
              return (
                <li key={t as string} className="flex items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy text-primary-foreground"><Icon className="h-6 w-6" aria-hidden /></span>
                  <span><span className="block font-display font-bold text-navy">{t as string}</span><span className="text-sm text-muted-foreground">{d as string}</span></span>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Services */}
        <section id="prestations" className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <SectionHead k="Nos prestations" t="Des solutions de sécurité adaptées à chaque site" d="Nous étudions votre besoin et mettons en place le dispositif le plus adapté, ponctuel ou permanent." />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.id} className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card p-7 transition hover:-translate-y-1 hover:shadow-card">
                <div className="diag-br absolute bottom-0 right-0 h-16 w-16 bg-mist-2 transition group-hover:bg-periwinkle/30" aria-hidden />
                <span className="grid h-14 w-14 place-items-center rounded-xl bg-mist-2 text-navy group-hover:bg-navy group-hover:text-primary-foreground"><s.icon className="h-7 w-7" aria-hidden /></span>
                <h3 className="mt-5 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {s.pts.map((p) => <li key={p} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-periwinkle" aria-hidden />{p}</li>)}
                </ul>
                <button onClick={() => pick(s.id)} className="relative mt-6 inline-flex items-center gap-2 self-start font-display text-sm font-bold text-navy hover:text-periwinkle">
                  Demander un devis<span className="sr-only"> pour {s.title}</span> <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Urgency */}
        <section className="relative overflow-hidden bg-periwinkle">
          <div className="diag-br absolute inset-y-0 right-0 w-2/3 bg-navy" aria-hidden />
          <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-navy-deep md:text-3xl">Besoin d'un agent rapidement ?</h2>
              <p className="mt-1 font-semibold text-navy-deep">Appelez-nous, nous étudions votre demande sans attendre.</p>
            </div>
            <a href={SITE.phoneHref} className="inline-flex items-center gap-3 rounded-lg bg-background px-6 py-4 font-display text-lg font-bold text-navy hover:bg-mist-2"><Phone className="h-5 w-5" aria-hidden />{SITE.phone}</a>
          </div>
        </section>

        {/* Sectors */}
        <section id="secteurs" className="bg-mist py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHead k="Secteurs d'intervention" t="Nous protégeons tous types de sites" />
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {SECTORS.map(([Icon, t]) => (
                <li key={t} className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 text-center transition hover:shadow-card">
                  <Icon className="h-9 w-9 text-navy" aria-hidden />
                  <span className="font-display text-sm font-bold text-navy md:text-base">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why + method */}
        <section id="methode" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:py-28 lg:grid-cols-2">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-periwinkle">Pourquoi 2M Sécurité</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-4xl">Une agence locale, exigeante et disponible</h2>
            <ul className="mt-10 space-y-7">
              {[[UserCheck, "Agents qualifiés et déclarés", "Titulaires de la carte professionnelle CNAPS, formés et employés dans le respect de la réglementation."],
                [Zap, "Réactivité", "Réponse à votre demande sous 24 h et mise en place rapide du dispositif."],
                [Handshake, "Interlocuteur unique", "Un responsable dédié suit votre dossier, de l'analyse jusqu'au reporting."],
                [MapPin, "Proximité", "Basés à Montpellier, nous connaissons le territoire et intervenons dans tout l'Hérault et en Occitanie."]].map(([I, t, d]) => {
                const Icon = I as typeof Zap;
                return (
                  <li key={t as string} className="flex gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist-2 text-navy"><Icon className="h-6 w-6" aria-hidden /></span>
                    <span><h3 className="text-lg font-bold text-navy">{t as string}</h3><p className="mt-1 text-muted-foreground">{d as string}</p></span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-primary-foreground md:p-10">
            <div className="diag-br absolute bottom-0 right-0 h-40 w-40 bg-periwinkle/30" aria-hidden />
            <div className="tri absolute right-10 top-8 h-5 w-6 bg-tri/30" aria-hidden />
            <h3 className="relative text-2xl font-extrabold">De votre demande à la prise de poste</h3>
            <ol className="relative mt-8 space-y-6">
              {[["Analyse du site", "Échange sur vos besoins et visite si nécessaire pour évaluer les risques."],
                ["Proposition sur mesure", "Un devis détaillé : nombre d'agents, horaires, consignes."],
                ["Mise en place", "Affectation des agents et transmission des consignes de poste."],
                ["Suivi et reporting", "Comptes rendus après chaque vacation et points réguliers."]].map(([t, d], i) => (
                <li key={t} className="flex gap-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-periwinkle font-display text-lg font-extrabold text-navy-deep">{i + 1}</span>
                  <span><span className="block font-display text-lg font-bold">{t}</span><span className="text-mist">{d}</span></span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Quote form */}
        <section id="devis" className="bg-mist-2 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <SectionHead k="Devis gratuit" t="Parlez-nous de votre besoin" d="Réponse sous 24 h, sans engagement." />
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="rounded-2xl bg-card p-6 shadow-card md:p-10">
                {sent ? (
                  <div role="status" className="py-12 text-center">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-navy text-primary-foreground"><Check className="h-8 w-8" aria-hidden /></span>
                    <h3 className="mt-6 text-2xl font-extrabold text-navy">Merci, votre demande a bien été envoyée</h3>
                    <p className="mt-3 text-muted-foreground">Nous revenons vers vous sous 24 h. Pour une urgence, appelez le {SITE.phone}.</p>
                    <button onClick={() => { setSent(false); setForm(empty); }} className="mt-6 font-display font-bold text-navy underline">Nouvelle demande</button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate className="space-y-6">
                    <fieldset>
                      <legend className="text-sm font-semibold text-navy">Prestations souhaitées</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {SERVICES.map((s) => <button type="button" key={s.id} aria-pressed={form.services.includes(s.id)} onClick={() => toggle("services", s.id)} className={chip(form.services.includes(s.id))}>{s.title}</button>)}
                      </div>
                    </fieldset>
                    <div className="grid gap-5 md:grid-cols-2">
                      {([["name", "Nom", true, "text", "name"], ["company", "Société", false, "text", "organization"], ["phone", "Téléphone", true, "tel", "tel"], ["email", "E-mail", true, "email", "email"], ["city", "Ville du site", false, "text", "address-level2"]] as const).map(([k, l, req, type, ac]) => (
                        <div key={k}>
                          <label htmlFor={`f-${k}`} className="block text-sm font-semibold text-navy">{l}{req && <span className="text-destructive" aria-hidden> *</span>}</label>
                          <input id={`f-${k}`} type={type} autoComplete={ac} maxLength={k === "email" ? 255 : 100} required={req} aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `e-${k}` : undefined}
                            className={`${input} mt-2 ${errors[k] ? "border-destructive" : ""}`} value={form[k]}
                            onChange={(e) => { setForm({ ...form, [k]: e.target.value }); if (errors[k]) setErrors({ ...errors, [k]: undefined }); }} />
                          {errors[k] && <p id={`e-${k}`} className="mt-1 text-sm text-destructive">{errors[k]}</p>}
                        </div>
                      ))}
                    </div>
                    <fieldset>
                      <legend className="text-sm font-semibold text-navy">Horaires</legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {HOURS.map((h) => <button type="button" key={h} aria-pressed={form.hours.includes(h)} onClick={() => toggle("hours", h)} className={chip(form.hours.includes(h))}>{h}</button>)}
                      </div>
                    </fieldset>
                    <div>
                      <label htmlFor="f-message" className="block text-sm font-semibold text-navy">Message</label>
                      <textarea id="f-message" rows={5} maxLength={1000} className={`${input} mt-2`} placeholder="Décrivez votre site, vos dates, vos contraintes…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-invalid={!!errors.message} />
                      {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                    </div>
                    <p className="text-xs text-muted-foreground">* Champs obligatoires. Vos données sont utilisées uniquement pour répondre à votre demande.</p>
                    <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-4 font-display font-bold text-primary-foreground hover:bg-navy-deep md:w-auto md:px-10">Envoyer ma demande <ArrowRight className="h-5 w-5" aria-hidden /></button>
                  </form>
                )}
              </div>
              <ul className="space-y-4">
                {[[Phone, "Téléphone", SITE.phone, SITE.phoneHref], [Mail, "E-mail", SITE.email, `mailto:${SITE.email}`], [MapPin, "Zone d'intervention", "Montpellier, Hérault et Occitanie", null]].map(([I, t, v, h]) => {
                  const Icon = I as typeof Phone;
                  const inner = <><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy text-primary-foreground"><Icon className="h-6 w-6" aria-hidden /></span><span><span className="block text-sm text-muted-foreground">{t as string}</span><span className="font-display font-bold text-navy">{v as string}</span></span></>;
                  return <li key={t as string}>{h ? <a href={h as string} className="flex items-center gap-4 rounded-2xl bg-card p-5 hover:shadow-card">{inner}</a> : <div className="flex items-center gap-4 rounded-2xl bg-card p-5">{inner}</div>}</li>;
                })}
                <li className="rounded-2xl bg-navy p-6 text-primary-foreground">
                  <Eye className="h-6 w-6 text-periwinkle" aria-hidden />
                  <p className="mt-3 font-display font-bold">Disponibles 24 h/24, 7 j/7</p>
                  <p className="mt-1 text-sm text-mist">Pour toute urgence, privilégiez l'appel téléphonique.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-20 md:py-28">
          <SectionHead k="FAQ" t="Questions fréquentes" />
          <div className="space-y-3">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group rounded-xl border bg-card p-5 open:shadow-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-bold text-navy [&::-webkit-details-marker]:hidden">
                  {q}<ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" aria-hidden />
                </summary>
                <p className="mt-3 text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-navy-deep text-mist">
        <div className="diag-tl absolute left-0 top-0 h-32 w-32 bg-navy" aria-hidden />
        <div className="diag-br absolute bottom-0 right-0 h-48 w-48 bg-periwinkle/15" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-3">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm">Agence de sécurité privée à Montpellier : gardiennage et surveillance dans l'Hérault et en Occitanie.</p>
          </div>
          <nav aria-label="Liens du pied de page">
            <h2 className="font-display font-bold text-primary-foreground">Navigation</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {[...nav, ["Devis gratuit", "#devis"]].map(([l, h]) => <li key={h}><a href={h} className="hover:text-primary-foreground">{l}</a></li>)}
            </ul>
          </nav>
          <div>
            <h2 className="font-display font-bold text-primary-foreground">Contact</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href={SITE.phoneHref} className="hover:text-primary-foreground">{SITE.phone}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-primary-foreground">{SITE.email}</a></li>
              <li>{SITE.zone}</li>
            </ul>
          </div>
        </div>
        <div className="relative border-t border-primary-foreground/10">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-6 text-xs leading-relaxed">
            <p>2M SÉCURITÉ · SAS au capital de 100 € · RCS Montpellier 983 892 621 · SIRET 983 892 621 00019 · TVA FR79983892621 · NAF 80.10Z</p>
            <p>Autorisation d'exercice CNAPS n° {SITE.cnaps}</p>
            <p>« L'autorisation d'exercice délivrée par le CNAPS ne confère aucune prérogative de puissance publique à l'entreprise ou aux personnes qui en bénéficient. » (article L.612-14 du Code de la sécurité intérieure)</p>
            <p>© {new Date().getFullYear()} 2M Sécurité</p>
          </div>
        </div>
      </footer>

      {/* Mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t bg-background p-3 lg:hidden">
        <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 rounded-lg border-2 border-navy py-3 font-display font-bold text-navy"><Phone className="h-5 w-5" aria-hidden />Appeler</a>
        <a href="#devis" className="flex items-center justify-center rounded-lg bg-navy py-3 font-display font-bold text-primary-foreground">Devis gratuit</a>
      </div>
    </div>
  );
}
