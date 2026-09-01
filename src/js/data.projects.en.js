/* ============================================================
   Project narratives (English) — the immersive view.
   Problem → Idea → Solution → Features → Tech → Result.
   Drawn from each project's own source tree and README.
   ============================================================ */
window.MW = window.MW || {};

MW.projectsEn = {
  sanad: {
    problem: "Between hospital visits, a cancer patient's condition is invisible to everyone who isn't in the room. One rough day looks like every other rough day. Family in another city have no way to know whether this week is worse than last week, and the patient is often the person least able to explain it. Separately, when a hospital needs blood urgently, the request goes out to every donor on the list — most of whom can't help, which teaches all of them to stop reading the alerts.",
    idea: "Put four people who are already involved into one app — the patient, their family, a companion, and donors — and let the system do the noticing. Rather than asking a patient to raise the alarm on their worst day, measure a few plain signals daily and let a rule decide when something has changed.",
    solution: "Sanad is a Flutter application on Firebase with five roles: patient, family member, companion, donor and admin. The patient records a short daily assessment — temperature, pain, fatigue, nausea, bleeding, appetite and emotional state, each on a simple scale. Every entry is flagged a risk day or not. A Cloud Function runs on each new assessment, reads the patient's last three in order, and when all three are risk days it notifies every family member whose link to that patient has been approved. Around that sit appointments and reminders, companion requests matched against declared availability, in-app messaging, and a blood-donation board where each hospital need is filtered through a full ABO/Rh compatibility matrix before it reaches a donor's feed.",
    features: [
      { b: "Daily health assessment", s: "Seven signals — temperature, pain, fatigue, nausea, bleeding, appetite, emotional state — recorded in under a minute." },
      { b: "Automatic family alert",  s: "A Cloud Function watches for three consecutive risk days and pushes to approved family members. No one has to ask for help." },
      { b: "Family linking with approval", s: "A relative requests a link to a patient; nothing is shared until the patient's side approves it." },
      { b: "Companion matching",      s: "Patients and families request a companion; companions publish their availability and respond." },
      { b: "Blood needs, filtered",   s: "Admin posts a hospital need — type, urgency, quantity, location. Donors only see what their blood type can answer." },
      { b: "Donor interest tracking", s: "A donor registers interest against an announcement and it's recorded, so the hospital sees who responded." },
      { b: "Appointments & reminders", s: "A calendar of treatment appointments with local notifications ahead of each one." },
      { b: "Admin dashboard",         s: "Users by role, blood-ad management with create, edit and close, and a full relationship view per person." },
      { b: "Arabic & English, properly", s: "Full localisation with right-to-left layout — not an English app with translated strings." }
    ],
    result: "Sanad's most important behaviour is also its least clever one: three consecutive risk days is a counting rule written in a function anyone can open and read. There is no prediction to be wrong about and no model to be argued with — the family simply finds out on day three instead of at the next appointment. The blood board works the same way, deciding relevance from a compatibility table rather than a broadcast, so the alerts stay worth reading.",
    resultPull: "It was my graduation project. It is also the first thing I built where being wrong would have mattered to someone."
  },

  mypath: {
    problem: "Official professional certification guides are often lengthy and complex, leaving graduates lost among thousands of options without a clear path, cost details, or registration steps tailored to their major.",
    idea: "Turn the document into a compass. Ask five questions instead of presenting a table, and end with a staged plan rather than a list — because what a graduate lacks isn't information, it's an order to do things in.",
    solution: "An intelligent system that streamlines the search journey, placing graduates on a precise and tailored tech track. Through a quick assessment, the system guides users through a structured roadmap (Foundation, Specialization, Mastery) backed by accredited certifications, sponsor entities, and full pathway details.",
    features: [
      { b: "Five-question path quiz", s: "Maps a graduate's interests onto the closest of ten tech career tracks." },
      { b: "Direct track picker",     s: "Skip the quiz entirely if you already know the field you're heading for." },
      { b: "Staged roadmap",          s: "Foundation → Specialization → Mastery, with real certifications and real HRDF reimbursement caps." },
      { b: "Official registration links", s: "Every certification points at the provider's own page rather than a summary of it." },
      { b: "Free courses hub",        s: "Curated free and official learning paths from eleven major providers." },
      { b: "CV coach, client-side",   s: "PDF and DOCX parsed in the browser — a hand-written ZIP reader plus native DecompressionStream." },
      { b: "ATS-style scoring",       s: "Heuristic checks with feedback tuned to the field being targeted, and an honest failure message when a PDF can't be read." },
      { b: "Searchable catalog",      s: "Every certification from the official guide, filterable by field." },
      { b: "Private analytics",       s: "A login-gated dashboard on Supabase. Page path, referrer host and device category only — no IPs, no cookies, no personal data." }
    ],
    result: "Successfully deployed and running as an interactive web application designed to serve tech professionals and guide their career paths, hosted securely via modern cloud platforms."
  },

  beauty: {
    problem: "Daily skincare consumers lack an easy, reliable way to analyze product ingredients, assess their safety levels, and check their compatibility with their specific skin types.",
    idea: "An intelligent platform dedicated to consumers who care about the daily quality of products they use, designed to evaluate product safety and suggest better alternatives for various skin types.",
    solution: "Building a digital tool that accurately analyzes product ingredients, identifies safety and hazard levels, suggests alternative products suited to the user's skin type, and analyzes how well the user's products interact and fit together.",
    features: [
      { b: "Ingredient-analysis algorithms", s: "Reading a product's ingredient data and grading safety and hazard levels." },
      { b: "Smart matching engine", s: "Links product properties to a personalised user profile." },
      { b: "Tailored recommendations", s: "Raising the user's health and beauty awareness." }
    ],
    result: "Empowering users to make conscious, safe purchasing and usage decisions for their daily skincare and makeup routines based on clear scientific and health standards."
  },

  advisor: {
    problem: "Consumers struggle to choose and configure PC hardware components that match their actual computational needs and strict financial budgets without compatibility issues.",
    idea: "An intelligent advisory system that simplifies the PC building and selection process by guiding users through precise questions to find their ideal match.",
    solution: "Building an interactive advisory platform that guides users through targeted questions regarding their use cases (gaming, design, coding) and budget, automatically recommending optimal, fully compatible configurations.",
    features: [
      { b: "Robust decision logic", s: "Hardware filtering and compatibility checks." },
      { b: "Intuitive interface, simplified steps", s: "Guiding the user to the right decision without technical complexity." }
    ],
    result: "Helping non-specialists reach a precise, dependable purchase decision — components that fit together, and the most performance their budget allows."
  }
};
