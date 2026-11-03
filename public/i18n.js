// English / French translations.
// Any element with data-i18n="key" gets its text replaced; data-i18n-html="key" allows links inside.
// To add a sentence: give the element a key, then add that key to BOTH "en" and "fr" below.
const TRANSLATIONS = {
  en: {
    "nav.genius": "GENIUS",
    "nav.projects": "Projects",
    "nav.teaching": "Teaching",
    "nav.resources": "Resources",
    "nav.cv": "CV",
    "nav.menu": "Menu",
    "lang.switch": "Passer en français",

    "side.bio": "Student at Télécom Paris. Write a short bio here: your field, what you work on, and what you're interested in.",
    "side.follow": "Follow",
    "side.email": "Email",

    "footer.follow": "Follow me",

    "home.doctitle": "Aziz Khalfat",
    "home.title": "WELCOME",
    "home.intro": "Hello! My name is Aziz Khalfat. This is the welcome text of your homepage: introduce yourself, your studies, and the topics you care about. My lectures are on the <a href=\"genius.html\">GENIUS</a> page.",
    "home.projects": "Projects",
    "home.project1": "<strong>Project one</strong>: one-line description. <a href=\"#\">Link</a>",
    "home.project2": "<strong>Project two</strong>: one-line description. <a href=\"#\">Link</a>",
    "home.teaching": "Teaching",
    "home.teachingText": "Courses, tutoring, or teaching assistant positions.",
    "home.resources": "Some useful resources",
    "home.resource": "Topic: <a href=\"#\">Resource title, Author</a>",
    "home.cv": "CV",
    "home.cvText": "Link to your CV: put the PDF in <code>public/files/</code> and link it as <a href=\"files/cv.pdf\">files/cv.pdf</a>.",

    "genius.doctitle": "GENIUS · Aziz Khalfat",
    "genius.title": "GENIUS",
    "genius.intro": "My lectures. Each one has its slides, notes, and a video when available.",
    "genius.slides": "Slides",
    "genius.notes": "Notes",
    "genius.video": "Video",
    "genius.l1.date": "Lecture 1 · January 2026",
    "genius.l1.title": "Title of the first lecture",
    "genius.l1.desc": "A short summary of what this lecture covers and who it is for.",
    "genius.l2.date": "Lecture 2 · February 2026",
    "genius.l2.title": "Title of the second lecture",
    "genius.l2.desc": "A short summary of what this lecture covers and who it is for.",
    "genius.l3.date": "Lecture 3 · March 2026",
    "genius.l3.title": "Title of the third lecture",
    "genius.l3.desc": "A short summary of what this lecture covers and who it is for."
  },
  fr: {
    "nav.genius": "GENIUS",
    "nav.projects": "Projets",
    "nav.teaching": "Enseignement",
    "nav.resources": "Ressources",
    "nav.cv": "CV",
    "nav.menu": "Menu",
    "lang.switch": "Switch to English",

    "side.bio": "Étudiant à Télécom Paris. Écrivez ici une courte bio : votre domaine, vos travaux et vos centres d'intérêt.",
    "side.follow": "Suivre",
    "side.email": "E-mail",

    "footer.follow": "Suivez-moi",

    "home.doctitle": "Aziz Khalfat",
    "home.title": "BIENVENUE",
    "home.intro": "Bonjour ! Je m'appelle Aziz Khalfat. Voici le texte d'accueil de votre page : présentez-vous, vos études et les sujets qui vous passionnent. Mes cours sont sur la page <a href=\"genius.html\">GENIUS</a>.",
    "home.projects": "Projets",
    "home.project1": "<strong>Projet un</strong> : description en une ligne. <a href=\"#\">Lien</a>",
    "home.project2": "<strong>Projet deux</strong> : description en une ligne. <a href=\"#\">Lien</a>",
    "home.teaching": "Enseignement",
    "home.teachingText": "Cours, soutien scolaire ou postes de chargé de TD.",
    "home.resources": "Quelques ressources utiles",
    "home.resource": "Sujet : <a href=\"#\">Titre de la ressource, Auteur</a>",
    "home.cv": "CV",
    "home.cvText": "Lien vers votre CV : placez le PDF dans <code>public/files/</code> et liez-le ainsi : <a href=\"files/cv.pdf\">files/cv.pdf</a>.",

    "genius.doctitle": "GENIUS · Aziz Khalfat",
    "genius.title": "GENIUS",
    "genius.intro": "Mes cours. Chacun dispose de ses diapositives, de notes et d'une vidéo lorsqu'elle est disponible.",
    "genius.slides": "Diapositives",
    "genius.notes": "Notes",
    "genius.video": "Vidéo",
    "genius.l1.date": "Cours 1 · janvier 2026",
    "genius.l1.title": "Titre du premier cours",
    "genius.l1.desc": "Un court résumé du contenu de ce cours et du public visé.",
    "genius.l2.date": "Cours 2 · février 2026",
    "genius.l2.title": "Titre du deuxième cours",
    "genius.l2.desc": "Un court résumé du contenu de ce cours et du public visé.",
    "genius.l3.date": "Cours 3 · mars 2026",
    "genius.l3.title": "Titre du troisième cours",
    "genius.l3.desc": "Un court résumé du contenu de ce cours et du public visé."
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
