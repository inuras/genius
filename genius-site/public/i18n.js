// English / French translations for the GENIUS site.
// data-i18n="key" replaces the text; data-i18n-html="key" allows links; data-i18n-aria="key" sets aria-label.
// To add a sentence: give the element a key, then add that key to BOTH "en" and "fr" below.
const TRANSLATIONS = {
  en: {
    "lang.switch": "Passer en français",
    "nav.lectures": "Courses & exercises",
    "nav.resources": "Resources",
    "site.tagline": "Courses and exercises by Aziz Khalfat",
    "footer.follow": "Follow me",
    "footer.email": "Email",

    "lectures.doctitle": "GENIUS · Courses and exercises",
    "lectures.heading": "Courses and exercises",
    "lectures.intro": "Tap or click a coloured square to open the document. An empty square means that document is not available yet.",
    "lectures.course": "Course",
    "lectures.exercises": "Exercises",
    "lectures.solutions": "Solutions",
    "lectures.syllabus": "Syllabus",
    "lectures.transversal": "Cross-cutting chapter",
    "lectures.reasoning": "Reasoning and writing proofs",
    "lectures.chapter": "Chapter",
    "lectures.c1": "Title of chapter 1",
    "lectures.c2": "Title of chapter 2",
    "lectures.c3": "Title of chapter 3",
    "lectures.c4": "Title of chapter 4",
    "lectures.c5": "Title of chapter 5",

    "res.doctitle": "GENIUS · Resources",
    "res.heading": "Resources",
    "res.intro": "Websites I recommend to go further in mathematics.",
    "res.visit": "Visit the site",
    "res.bertault.title": "Christophe Bertault’s articles",
    "res.bertault.by": "Christophe Bertault · Mathematics in MPSI",
    "res.bertault.desc": "Mathematics articles that Christophe Bertault writes outside his MPSI teaching. Some are accessible from MPSI/PCSI/PTSI level, others are for a more expert audience; each one states the level required.",
    "res.culturemath.by": "École normale supérieure (ENS)",
    "res.culturemath.desc": "The mathematics resource site of the École normale supérieure: articles to broaden your mathematical culture beyond the syllabus.",
    "res.mpark.by": "Institut Henri Poincaré (Sorbonne Université / CNRS)",
    "res.mpark.desc": "One Saturday a month at 3\u00a0pm, the Institut Henri Poincaré hosts mini-courses of about 1\u00a0h\u00a030 on a wide range of mathematical topics, for university students, classes préparatoires and teachers. Free, but registration is required; videos are on Carmin.tv."
  },
  fr: {
    "lang.switch": "Switch to English",
    "nav.lectures": "Cours et exercices",
    "nav.resources": "Ressources",
    "site.tagline": "Cours et exercices d'Aziz Khalfat",
    "footer.follow": "Suivez-moi",
    "footer.email": "E-mail",

    "lectures.doctitle": "GENIUS · Cours et exercices",
    "lectures.heading": "Cours et exercices",
    "lectures.intro": "Touchez ou cliquez sur un carré coloré pour ouvrir le document. Un carré vide signifie que le document n'est pas encore disponible.",
    "lectures.course": "Cours",
    "lectures.exercises": "Exercices",
    "lectures.solutions": "Corrigés",
    "lectures.syllabus": "Programme",
    "lectures.transversal": "Chapitre transversal",
    "lectures.reasoning": "Raisonner, rédiger",
    "lectures.chapter": "Chapitre",
    "lectures.c1": "Titre du chapitre 1",
    "lectures.c2": "Titre du chapitre 2",
    "lectures.c3": "Titre du chapitre 3",
    "lectures.c4": "Titre du chapitre 4",
    "lectures.c5": "Titre du chapitre 5",

    "res.doctitle": "GENIUS · Ressources",
    "res.heading": "Ressources",
    "res.intro": "Des sites que je recommande pour aller plus loin en mathématiques.",
    "res.visit": "Visiter le site",
    "res.bertault.title": "Articles de Christophe Bertault",
    "res.bertault.by": "Christophe Bertault · Mathématiques en MPSI",
    "res.bertault.desc": "Des articles de mathématiques que Christophe Bertault écrit en dehors de son enseignement en MPSI. Certains sont accessibles dès la MPSI/PCSI/PTSI, d'autres s'adressent à un public plus expert ; chacun indique le niveau requis.",
    "res.culturemath.by": "École normale supérieure (ENS)",
    "res.culturemath.desc": "Le site de ressources mathématiques de l'École normale supérieure : des articles pour enrichir sa culture mathématique au-delà du programme.",
    "res.mpark.by": "Institut Henri Poincaré (Sorbonne Université / CNRS)",
    "res.mpark.desc": "Un samedi par mois à 15\u00a0h, l'Institut Henri Poincaré propose des mini-cours d'environ 1\u00a0h\u00a030 sur des sujets variés de mathématiques, pour les étudiants, les classes préparatoires et les enseignants. Inscription gratuite mais obligatoire ; vidéos sur Carmin.tv."
  }
};

const LANG_KEY = "site-lang";

function getSavedLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "fr") return saved;
  } catch (e) { /* storage unavailable */ }
  return (navigator.language || "").toLowerCase().startsWith("fr") ? "fr" : "en";
}

function applyLang(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const text = dict[el.dataset.i18n];
    if (text !== undefined) el.textContent = text;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const html = dict[el.dataset.i18nHtml];
    if (html !== undefined) el.innerHTML = html;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const label = dict[el.dataset.i18nAria];
    if (label !== undefined) el.setAttribute("aria-label", label);
  });
  const titleKey = document.body.dataset.titleKey;
  if (titleKey && dict[titleKey]) document.title = dict[titleKey];
  const btn = document.querySelector(".lang-switch");
  if (btn) {
    // The button shows the language you will switch TO.
    btn.textContent = lang === "en" ? "FR" : "EN";
    btn.setAttribute("aria-label", dict["lang.switch"]);
    btn.title = dict["lang.switch"];
  }
  document.documentElement.classList.remove("i18n-pending");
}

function setLang(lang) {
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* ignore */ }
  applyLang(lang);
}

applyLang(getSavedLang());
document.querySelector(".lang-switch")?.addEventListener("click", () => {
  setLang(document.documentElement.lang === "fr" ? "en" : "fr");
});
document.getElementById("year").textContent = new Date().getFullYear();
