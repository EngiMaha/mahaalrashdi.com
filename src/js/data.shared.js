/* ============================================================
   Shared, language-independent data.
   Links, stacks and ids live here once; the EN and AR content
   files reference them. Every value is taken from Maha's CV or
   from the project's own source tree.
   ============================================================ */
window.MW = window.MW || {};

MW.contact = {
  email:         "Eng.mahaalbrrak@gmail.com",
  github:        "https://github.com/EngiMaha",
  githubLabel:   "github.com/EngiMaha",
  linkedin:      "https://www.linkedin.com/in/Mahaalrashdi",
  linkedinLabel: "linkedin.com/in/Mahaalrashdi"
  /* The phone number on the CV is deliberately not published. */
};

MW.worlds = ["engineer", "creator", "solver", "maha"];

MW.projectOrder = ["sanad", "mypath", "beauty", "advisor"];

/* Status and year, stated only where they are actually known.
   Clean Beauty and PC Advisor carry no year because none is
   recorded anywhere in Maha's material. */
MW.projectStatus = {
  sanad:   { key: "grad",    year: "2026" },
  mypath:  { key: "live",    year: "2026" },
  beauty:  { key: "private", year: "" },
  advisor: { key: "poc",     year: "" }
};

/* An award, stated only where one was actually won. */
MW.projectAward = {
  mypath: { en: "Gold Medal \u00B7 Kanz AI Hackathon",
            ar: "\u0627\u0644\u0645\u064a\u062f\u0627\u0644\u064a\u0629 \u0627\u0644\u0630\u0647\u0628\u064a\u0629 \u00B7 \u0647\u0627\u0643\u0627\u062b\u0648\u0646 Kanz AI" }
};

/* Stacks — proper nouns, identical in both languages. */
MW.stacks = {
  sanad: [
    { k: "app",   items: ["Flutter", "Dart", "Provider", "Material 3"] },
    { k: "cloud", items: ["Firebase Auth", "Cloud Firestore", "Firebase Storage", "Cloud Messaging", "Cloud Functions (Node.js)"] },
    { k: "extra", items: ["table_calendar", "flutter_local_notifications", "image_picker", "intl + flutter_localizations"] }
  ],
  mypath: [
    { k: "app",   items: ["HTML", "CSS", "JavaScript", "no build step", "no dependencies"] },
    { k: "cloud", items: ["Supabase (Postgres + Auth)", "Row Level Security", "GitHub Pages"] },
    { k: "extra", items: ["DecompressionStream", "hand-written ZIP reader", "PDF FlateDecode parser"] }
  ],
  beauty: [
    { k: "app",   items: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "React Query"] },
    { k: "cloud", items: ["FastAPI", "Python 3.11+", "Pydantic v2", "SQLAlchemy", "Alembic", "PostgreSQL", "Docker"] },
    { k: "extra", items: ["OpenAI / Claude / Gemini (swappable)", "Open Beauty Facts", "72 tests"] }
  ],
  advisor: [
    { k: "app",   items: ["Python", "Streamlit", "pandas"] },
    { k: "cloud", items: ["OpenAI API", "OpenRouter"] },
    { k: "extra", items: ["LangChain", "LangGraph (ReAct agent)", "Tavily Search", "DuckDuckGo Search"] }
  ]
};

/* `state` drives how each button renders:
   live | repo | private (dashed, not clickable).
   A project with no entry here shows no link row. */
MW.links = {
  mypath:  [{ state: "live", href: "https://www.mypathco.com", key: "live" },
            { state: "repo", href: "https://github.com/EngiMaha/mypath-career-compass", key: "repo" }],
  beauty:  [{ state: "private", key: "private" }],
  advisor: [{ state: "private", key: "private" }]
};
