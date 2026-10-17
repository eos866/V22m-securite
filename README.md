# 2M Sécurité – site vitrine

Site vitrine de 2M Sécurité (gardiennage et surveillance à Montpellier), conçu avec Lovable puis adapté en site statique pour GitHub Pages.

## Mise en ligne (GitHub Pages)

Le site compilé est présent à la racine du dépôt (et en copie dans `docs/`).
Dans **Settings → Pages** : *Deploy from a branch* → branche **main**, dossier **/ (root)** ou **/docs** → **Save**.

## Modifier les coordonnées

Téléphone, e-mail, zone et numéro CNAPS sont centralisés dans `source/src/config/site.ts`.
Après modification, recompilez le site (voir ci-dessous) pour mettre à jour `docs/`.

## Développement

```bash
cd source
npm install
npm run dev      # aperçu local
npm run build    # compile le site dans docs/ (copier ensuite docs/* à la racine)
```

Stack : React 19, Vite, Tailwind CSS 4, icônes lucide-react.
