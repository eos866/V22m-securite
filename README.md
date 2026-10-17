# 2M Sécurité – site vitrine

Site vitrine de 2M Sécurité (gardiennage et surveillance à Montpellier), conçu avec Lovable puis adapté en site statique pour GitHub Pages.

## Mise en ligne (GitHub Pages)

Le site compilé se trouve dans le dossier `docs/`.
Dans **Settings → Pages** : *Deploy from a branch* → branche **main**, dossier **/docs** → **Save**.

## Modifier les coordonnées

Téléphone, e-mail, zone et numéro CNAPS sont centralisés dans `src/config/site.ts`.
Après modification, recompilez le site (voir ci-dessous) pour mettre à jour `docs/`.

## Développement

```bash
npm install
npm run dev      # aperçu local
npm run build    # compile le site dans docs/
```

Stack : React 19, Vite, Tailwind CSS 4, icônes lucide-react.
