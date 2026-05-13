// Lightweight i18n — UI strings only, switched via React context.
// No URL routing change (SEO multilingual is a separate session).

export const LOCALES = ["es", "fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";

export type Dict = {
  // header
  navOrder: string;
  // hero
  heroLine1: string;
  heroLine2: string;
  heroLine3a: string;
  heroLine3b: string;
  heroSub1: string;
  heroSub2: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroOpenUntil: string;
  // marquee
  marqueeOpen: string;
  marqueeOrder: string;
  marqueeLocation: string;
  marqueeFrom: string;
  marqueeNight: string;
  // statement
  statementEyebrow: string;
  statementLines: string[];
  statementSignature: string;
  // carta tag
  cartaEyebrow: string;
  cartaTeaserEyebrow: string;
  cartaTeaserTitleA: string;
  cartaTeaserTitleB: string;
  cartaTeaserTitleC: string;
  cartaTeaserCopy: string;
  cartaTeaserCtaMenu: string;
  cartaTeaserCtaOrder: string;
  // separator
  separatorNext: string;
  // product
  productOrder: string;
  productPrice: string;
  // local
  localEyebrow: string;
  localTitleA: string;
  localTitleB: string;
  localStickerLabel: string;
  localBranch: string;
  localHours: string;
  localCall: string;
  localWrite: string;
  localCtaDirections: string;
  localCtaOrder: string;
  localMapEyebrow: string;
  // footer
  footerManifesto: string;
  footerQuote: string;
  footerHandmade: string;
  footerColCarta: string;
  footerColLocal: string;
  footerColMore: string;
  footerOrderOnline: string;
  footerSeeMenu: string;
  footerFullMenu: string;
  footerAddress: string;
  footerInstagram: string;
  footerStory: string;
  footerFaq: string;
  footerLegal: string;
  footerPrivacy: string;
  footerCookies: string;
  footerSoundOn: string;
  footerSoundOff: string;
  footerCopyright: string;
  // intro loader
  loaderEyebrow: string;
  loaderTagline: string;
  // install prompt
  installEyebrow: string;
  installTitle: string;
  installCopy: string;
  installCopyIos: string;
  installCta: string;
  installDismiss: string;
};

export const dictionaries: Record<Locale, Dict> = {
  es: {
    navOrder: "Pide ya",
    heroLine1: "FRENCH",
    heroLine2: "TACOS",
    heroLine3a: "DE LA",
    heroLine3b: "CALLE",
    heroSub1: "Tacos urbanos, 100% franceses.",
    heroSub2: "Carne jugosa, patatas dentro, quesazo fundido.",
    heroCtaPrimary: "Pide ya",
    heroCtaSecondary: "Ver carta",
    heroOpenUntil: "Abierto",
    marqueeOpen: "ABIERTO HASTA LAS 00:00",
    marqueeOrder: "PIDE EN GLOVO",
    marqueeLocation: "Nº01 · CIUDAD REAL",
    marqueeFrom: "DESDE 7,50€",
    marqueeNight: "◉ NOCTURNE — LA CALLE NUNCA DUERME",
    statementEyebrow: "Manifesto · 2024",
    statementLines: [
      "« NACIDO EN FRANCIA,",
      "CRIADO EN LA CALLE.",
      "CARNE JUGOSA,",
      "PATATAS DENTRO,",
      "QUESAZO FUNDIDO,",
      "Y SE ACABÓ. »",
    ],
    statementSignature: "— CLM French Tacos",
    cartaEyebrow: "Carta editorial",
    cartaTeaserEyebrow: "+ Esto es sólo el aperitivo",
    cartaTeaserTitleA: "También hay",
    cartaTeaserTitleB: "Sándwiches",
    cartaTeaserTitleC: "Nuggets & Tenders, Patatas y Menú Kids.",
    cartaTeaserCopy:
      "La carta completa está en la web oficial — actualizada al día y con todas las variantes.",
    cartaTeaserCtaMenu: "Ver carta completa",
    cartaTeaserCtaOrder: "Pedir en Glovo",
    separatorNext: "↓ Siguiente",
    productOrder: "Pedir en Glovo",
    productPrice: "Precio",
    localEyebrow: "/ 03 — Local",
    localTitleA: "Una calle.",
    localTitleB: "Una plancha.",
    localStickerLabel: "Único local — de momento.",
    localBranch: "Nº01 · Ciudad Real",
    localHours: "Horario",
    localCall: "Llama",
    localWrite: "Escribe",
    localCtaDirections: "Cómo llegar",
    localCtaOrder: "Pedir en Glovo",
    localMapEyebrow: "En el mapa",
    footerManifesto: "Manifesto",
    footerQuote:
      "« Tacos urbanos, 100% franceses. Carne jugosa, patatas dentro, quesazo fundido. »",
    footerHandmade: "Hecho con cariño en Ciudad Real. Calle Ciruela 28.",
    footerColCarta: "Carta",
    footerColLocal: "Local",
    footerColMore: "Más",
    footerOrderOnline: "Pedir en Glovo",
    footerSeeMenu: "Ver carta",
    footerFullMenu: "Menú completo",
    footerAddress: "Dirección",
    footerInstagram: "Instagram",
    footerStory: "Historia",
    footerFaq: "FAQ",
    footerLegal: "Aviso legal",
    footerPrivacy: "Privacidad",
    footerCookies: "Cookies",
    footerSoundOn: "Sonido on",
    footerSoundOff: "Sonido off",
    footerCopyright: "CLM French Tacos — © {year} · Ciudad Real",
    loaderEyebrow: "Ciudad Real · Desde 2024",
    loaderTagline: "Carne · Patatas · Quesazo",
    installEyebrow: "Instalar app",
    installTitle: "CLM en tu pantalla de inicio.",
    installCopy: "Acceso directo sin abrir el navegador. Pesa lo que un sticker.",
    installCopyIos:
      "Pulsa Compartir y luego Añadir a pantalla de inicio.",
    installCta: "Instalar",
    installDismiss: "No, gracias",
  },
  fr: {
    navOrder: "Commander",
    heroLine1: "FRENCH",
    heroLine2: "TACOS",
    heroLine3a: "DE LA",
    heroLine3b: "RUE",
    heroSub1: "Tacos urbains, 100% français.",
    heroSub2: "Viande juteuse, frites dedans, fromage fondu.",
    heroCtaPrimary: "Commander",
    heroCtaSecondary: "Voir la carte",
    heroOpenUntil: "Ouvert",
    marqueeOpen: "OUVERT JUSQU'À 00:00",
    marqueeOrder: "COMMANDE SUR GLOVO",
    marqueeLocation: "N°01 · CIUDAD REAL",
    marqueeFrom: "À PARTIR DE 7,50€",
    marqueeNight: "◉ NOCTURNE — LA RUE NE DORT JAMAIS",
    statementEyebrow: "Manifeste · 2024",
    statementLines: [
      "« NÉ EN FRANCE,",
      "ÉLEVÉ DANS LA RUE.",
      "VIANDE JUTEUSE,",
      "FRITES DEDANS,",
      "FROMAGE FONDU,",
      "ET C'EST TOUT. »",
    ],
    statementSignature: "— CLM French Tacos",
    cartaEyebrow: "Carte éditoriale",
    cartaTeaserEyebrow: "+ Ce n'est que l'apéro",
    cartaTeaserTitleA: "Il y a aussi",
    cartaTeaserTitleB: "Sandwichs",
    cartaTeaserTitleC: "Nuggets & Tenders, Frites et Menu Kids.",
    cartaTeaserCopy:
      "La carte complète est sur le site officiel — mise à jour quotidienne avec toutes les variantes.",
    cartaTeaserCtaMenu: "Voir la carte complète",
    cartaTeaserCtaOrder: "Commande sur Glovo",
    separatorNext: "↓ Suivant",
    productOrder: "Commander sur Glovo",
    productPrice: "Prix",
    localEyebrow: "/ 03 — Local",
    localTitleA: "Une rue.",
    localTitleB: "Une plancha.",
    localStickerLabel: "Seul local — pour l'instant.",
    localBranch: "N°01 · Ciudad Real",
    localHours: "Horaires",
    localCall: "Appeler",
    localWrite: "Écrire",
    localCtaDirections: "Comment venir",
    localCtaOrder: "Commande sur Glovo",
    localMapEyebrow: "Sur la carte",
    footerManifesto: "Manifeste",
    footerQuote:
      "« Tacos urbains, 100% français. Viande juteuse, frites dedans, fromage fondu. »",
    footerHandmade: "Fait avec soin à Ciudad Real. Calle Ciruela 28.",
    footerColCarta: "Carte",
    footerColLocal: "Local",
    footerColMore: "Plus",
    footerOrderOnline: "Commande sur Glovo",
    footerSeeMenu: "Voir la carte",
    footerFullMenu: "Carte complète",
    footerAddress: "Adresse",
    footerInstagram: "Instagram",
    footerStory: "Histoire",
    footerFaq: "FAQ",
    footerLegal: "Mentions légales",
    footerPrivacy: "Confidentialité",
    footerCookies: "Cookies",
    footerSoundOn: "Son on",
    footerSoundOff: "Son off",
    footerCopyright: "CLM French Tacos — © {year} · Ciudad Real",
    loaderEyebrow: "Ciudad Real · Depuis 2024",
    loaderTagline: "Viande · Frites · Fromage",
    installEyebrow: "Installer l'app",
    installTitle: "CLM sur ton écran d'accueil.",
    installCopy: "Accès direct sans ouvrir le navigateur. Léger comme un sticker.",
    installCopyIos: "Appuie sur Partager puis Ajouter à l'écran d'accueil.",
    installCta: "Installer",
    installDismiss: "Non merci",
  },
  en: {
    navOrder: "Order",
    heroLine1: "FRENCH",
    heroLine2: "TACOS",
    heroLine3a: "FROM THE",
    heroLine3b: "STREET",
    heroSub1: "Urban tacos, 100% French.",
    heroSub2: "Juicy meat, fries inside, full-on melted cheese.",
    heroCtaPrimary: "Order",
    heroCtaSecondary: "See menu",
    heroOpenUntil: "Open",
    marqueeOpen: "OPEN UNTIL 00:00",
    marqueeOrder: "ORDER ON GLOVO",
    marqueeLocation: "Nº01 · CIUDAD REAL",
    marqueeFrom: "FROM 7,50€",
    marqueeNight: "◉ NOCTURNE — THE STREET NEVER SLEEPS",
    statementEyebrow: "Manifesto · 2024",
    statementLines: [
      "« BORN IN FRANCE,",
      "RAISED ON THE STREET.",
      "JUICY MEAT,",
      "FRIES INSIDE,",
      "MELTED CHEESE,",
      "AND THAT'S IT. »",
    ],
    statementSignature: "— CLM French Tacos",
    cartaEyebrow: "Editorial menu",
    cartaTeaserEyebrow: "+ Just the starter",
    cartaTeaserTitleA: "There's also",
    cartaTeaserTitleB: "Sandwiches",
    cartaTeaserTitleC: "Nuggets & Tenders, Fries and a Kids Menu.",
    cartaTeaserCopy:
      "Full menu lives on the official site — updated daily with every variant.",
    cartaTeaserCtaMenu: "Full menu",
    cartaTeaserCtaOrder: "Order on Glovo",
    separatorNext: "↓ Next",
    productOrder: "Order on Glovo",
    productPrice: "Price",
    localEyebrow: "/ 03 — Venue",
    localTitleA: "One street.",
    localTitleB: "One griddle.",
    localStickerLabel: "Only venue — for now.",
    localBranch: "Nº01 · Ciudad Real",
    localHours: "Hours",
    localCall: "Call",
    localWrite: "Write",
    localCtaDirections: "Get directions",
    localCtaOrder: "Order on Glovo",
    localMapEyebrow: "On the map",
    footerManifesto: "Manifesto",
    footerQuote:
      "« Urban tacos, 100% French. Juicy meat, fries inside, melted cheese. »",
    footerHandmade: "Made with care in Ciudad Real. Calle Ciruela 28.",
    footerColCarta: "Menu",
    footerColLocal: "Venue",
    footerColMore: "More",
    footerOrderOnline: "Order on Glovo",
    footerSeeMenu: "See menu",
    footerFullMenu: "Full menu",
    footerAddress: "Address",
    footerInstagram: "Instagram",
    footerStory: "Story",
    footerFaq: "FAQ",
    footerLegal: "Legal notice",
    footerPrivacy: "Privacy",
    footerCookies: "Cookies",
    footerSoundOn: "Sound on",
    footerSoundOff: "Sound off",
    footerCopyright: "CLM French Tacos — © {year} · Ciudad Real",
    loaderEyebrow: "Ciudad Real · Since 2024",
    loaderTagline: "Meat · Fries · Cheese",
    installEyebrow: "Install app",
    installTitle: "CLM on your home screen.",
    installCopy: "One-tap access. Lighter than a sticker.",
    installCopyIos: "Tap Share then Add to Home Screen.",
    installCta: "Install",
    installDismiss: "No thanks",
  },
};

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}
