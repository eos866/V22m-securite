// Coordonnées et réglages de l'entreprise : modifier ici uniquement.
export const SITE = {
  name: "3S Fergo Grand Sud",
  brand: "2M Sécurité",
  fullName: "3S Fergo Grand Sud / 2M Sécurité",
  legalName: "2M SÉCURITÉ",
  phone: "06 52 80 55 62",
  phoneHref: "tel:+33652805562",
  // Numéro WhatsApp au format international, sans + ni espaces
  whatsapp: "33652805562",
  email: "contact@2msecurite.fr",
  zone: "Montpellier · Hérault · Occitanie",
  address: "73 rue Robert de Cotte, Appt 64",
  city: "34080 Montpellier",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=73+rue+Robert+de+Cotte+34080+Montpellier",
  cnaps: "AUT-034-2123-04-19-20240920456",
  siren: "983 892 621",
  siret: "983 892 621 00019",
  tva: "FR79983892621",
  capital: "100 €",
  president: "Khaly Faye",
  // Adresse d'envoi du formulaire (Formspree, Web3Forms…). Vide = le formulaire
  // ouvre la messagerie du visiteur avec la demande pré-remplie vers SITE.email.
  formEndpoint: "",
};

export const ZONES = [
  "Montpellier", "Lattes", "Castelnau-le-Lez", "Pérols", "Mauguio", "Saint-Jean-de-Védas",
  "Juvignac", "Grabels", "Lunel", "Sète", "Frontignan", "Agde", "Béziers", "Pézenas",
  "Clermont-l'Hérault", "Lodève", "Ganges",
];

export const whatsappLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
