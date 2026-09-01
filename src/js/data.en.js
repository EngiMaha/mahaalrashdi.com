/* ============================================================
   English content.
   Every professional claim traces to the CV or to the project's
   own source. Anything genuinely unknown is a `slot`, rendered
   on the page as an open marker — never invented.
   ============================================================ */
window.MW = window.MW || {};

MW.en = {
  dir: "ltr",
  ui: {
    brand: "Maha Alrashdi",
    brandSub: "Inside Maha's World",
    skip: "Skip to content",
    back: "Back to the hub",
    close: "Close",
    enter: "Enter",
    hub: "The hub",
    next: "Next world",
    nextProject: "Next project",
    theme: "Theme",
    live: "Live",
    repo: "Source",
    private: "Private repository",
    stackApp: "Application",
    stackCloud: "Backend & cloud",
    stackExtra: "Notable pieces",
    st: {
      live:    "Live",
      grad:    "Graduation project",
      private: "Private",
      poc:     "Proof of concept"
    },
    otherLang: "العربية",
    switchTo: "اقرأ بالعربية"
  },

  hub: {
    eyebrow: "Inside Maha's World",
    hello: "Hi, I'm ",
    name: "Maha.",
    line: "A Computer Science and Engineering graduate passionate about Generative AI and intelligent AI Agents. I don't just write code; I build smart solutions leveraging Large Language Models (LLMs) to turn complex challenges into impactful reality. Backed by practical hands-on experience in the IT sector at the Ministry of Defense, I move forward with a clear vision to shape an innovative and influential tech future.",
    reach: "Get in Touch",
    reachLinks: { linkedinK: "LinkedIn", emailK: "Email", githubK: "GitHub" },
    portals: [
      { id: "engineer", title: "Academic &amp; Professional Journey", note: "The degree, the years abroad, and six months inside a hospital IT department." },
      { id: "creator",  title: "About My Projects",                   note: "Each build opens into a world of its own." },
      { id: "solver",   title: "Problem Solving &amp; Architecture",  note: "The complex problems behind the projects, and how each was solved." },
      { id: "maha",     title: "Vision &amp; Ambition",               note: "Passion, competition, and where this is heading." }
    ]
  },

  engineer: {
    eyebrow: "Pillar one",
    title: "Academic &amp; Professional Journey",
    lead: "Five years of passion for computer science and engineering, preceded by international study, and hands-on experience putting technology to work inside military healthcare.",

    eduTitle: "Education",
    eduLabel: "Where I studied",
    education: [
      {
        when: "2021 — 2026",
        what: "Bachelor of Computer Science and Engineering",
        where: "University of Hafar Al-Batin",
        note: "Graduation project: Sanad — a Flutter and Firebase support system for cancer patients, their families, companions and blood donors.",
        pills: ["Data Structures", "Databases", "Operating Systems", "Network Security", "SDLC", "AI Fundamentals"]
      },
      {
        when: "2014 — 2017",
        what: "Mt. Auburn International Academy",
        where: "United States",
        note: "Three years of school abroad — English fluency, and a wider social and cultural frame of reference.",
        pills: []
      }
    ],

    expTitle: "Experience",
    expLabel: "Where I worked",
    exp: {
      when: "Jun — Dec 2025",
      role: "IT Rotational Intern",
      org: "Ministry of Defense · Northern Area Armed Forces Hospital",
      intro: "A rotational internship across three teams rather than a seat in one — deliberately, to see how an enterprise IT environment actually holds together.",
      rotations: [
        { n: "Rotation 1", t: "IT Operations",          d: "First-line support: diagnosing and resolving hardware, software and connectivity faults for end users." },
        { n: "Rotation 2", t: "Network Administration", d: "Keeping network services reliable, and taking part in troubleshooting and incident resolution." },
        { n: "Rotation 3", t: "Data Center",            d: "Routine maintenance and infrastructure monitoring alongside the technical teams." }
      ],
      duties: [
        "Provided first-line technical support, diagnosing and resolving hardware, software and connectivity issues for end users.",
        "Assisted in maintaining IT infrastructure, keeping systems, devices and network services running reliably.",
        "Took part in troubleshooting and incident resolution to support daily operational continuity.",
        "Collaborated with technical teams on routine maintenance and infrastructure monitoring.",
        "Built up working knowledge of IT operations, cybersecurity practice, and healthcare technology environments."
      ]
    },

    skillsTitle: "Skills &amp; Technologies I've Worked With",
    skillsLabel: "What I use",
    skillsNote: "Listed, not scored. A percentage next to a skill is a number somebody made up.",
    skillGroups: [
      { k: "Mobile &amp; App",     items: ["Flutter", "Dart", "Android Studio", "Firebase", "Material 3"] },
      { k: "AI",                   items: ["AI fundamentals", "AI agents", "Chatbots", "RAG", "Prompt-to-structure design"] },
      { k: "Data &amp; Systems",   items: ["Data structures", "Databases", "Operating systems", "Firestore", "PostgreSQL"] },
      { k: "Security",             items: ["Network security", "Kali Linux", "Web penetration testing", "Digital forensics", "CTF"] },
      { k: "Engineering practice", items: ["SDLC", "Git", "Version control", "System architecture", "UI/UX design"] },
      { k: "Web",                  items: ["HTML", "CSS", "JavaScript", "Next.js", "FastAPI", "Python"] }
    ],

    certTitle: "Certificates",
    certLabel: "What I've completed",
    certs: [
      { n: "AI Learning Plan",                    by: "IBM Skills Build" },
      { n: "Applied AI Agents, Chat Bots &amp; RAG", by: "IBM Skills Build" },
      { n: "Web Penetration Tester",              by: "UHB" },
      { n: "CTF Participate",                     by: "CCSES Students Club" },
      { n: "Cyberthon",                           by: "UHB" },
      { n: "Digital Forensics Fundamentals",      by: "UHB" }
    ],

    langTitle: "Languages",
    langs: [
      { n: "Arabic",  d: "Native" },
      { n: "English", d: "Professional Proficiency (Fluent)" },
      { n: "French",  d: "Basics" }
    ]
  },

  creator: {
    eyebrow: "Pillar two",
    title: "About My Projects",
    lead: "A selected few of the projects that carry my technical passion — chief among them My Path, awarded the Gold Medal at the Kanz AI Hackathon.",
    projects: {
      sanad: {
        name: "SANNAD",
        arabicName: "",
        tag: "Comprehensive Health Support System",
        mission: "An intelligent platform connecting cancer patients, families, and caregivers for real-time health tracking, appointments, and blood SOS requests.",
        meta: ["Graduation project", "Jan — May 2026", "Flutter + Firebase"],
        role: "Full-Stack Developer &amp; Lead Designer"
      },
      mypath: {
        name: "My Path",
        arabicName: "",
        tag: "Tech Career Compass",
        mission: "A bilingual platform transforming official professional certification guides into an interactive roadmap with an intelligent CV analyzer.",
        meta: ["Live", "Jul 2026", "Zero dependencies"],
        role: "Designer &amp; Developer"
      },
      beauty: {
        name: "Clean Beauty",
        arabicName: "",
        tag: "Smart Ingredient &amp; Product Analysis",
        mission: "A platform evaluating skincare and makeup ingredients, assessing safety levels, and suggesting suitable alternatives for user skin profiles.",
        meta: ["FastAPI + Next.js", "72 tests", "8 measured scores"],
        role: "Designer &amp; Developer"
      },
      advisor: {
        name: "PC Advisor",
        arabicName: "",
        tag: "Interactive PC Build Advisor",
        mission: "An interactive advisory system guiding users through smart questions to select and configure fully compatible PC hardware matching their needs.",
        meta: ["Proof of concept", "Python + LangGraph", "Agentic AI"],
        role: "Developer"
      }
    }
  },

  solver: {
    eyebrow: "Pillar three",
    title: "Problem Solving &amp; Architecture",
    lead: "A detailed breakdown of complex technical problems solved programmatically and logically across the projects featured in the previous section.",
    casesLabel: "The four breakdowns",
    keys: { problem: "The Problem", solution: "The Solution", tech: "Tech" },
    cases: [
      {
        id: "sanad",
        name: "SANNAD",
        problem: "Communication gap between cancer patients, families, and caregivers.",
        solution: "A comprehensive mobile support system bridging portals for health tracking, appointments, and blood donor SOS requests.",
        tech: "Built using Flutter for cross-platform compatibility with real-time data sync."
      },
      {
        id: "mypath",
        name: "My Path",
        problem: "Tech graduates struggling to align career paths with official HRDF-supported certifications.",
        solution: "An interactive bilingual career compass featuring path quizzes, roadmaps, and a client-side CV coach.",
        tech: "Built as a self-contained static architecture with Supabase for secure admin analytics."
      },
      {
        id: "beauty",
        name: "Clean Beauty",
        problem: "Users lacking an easy way to analyze skincare ingredients and safety.",
        solution: "An analysis platform evaluating ingredients, assessing safety risks, and suggesting compatible alternatives based on skin profiles.",
        tech: "Engineered ingredient-matching algorithms and a recommendation engine."
      },
      {
        id: "advisor",
        name: "PC Advisor",
        problem: "Consumers struggling to choose and configure PC hardware matching their needs and budgets without compatibility issues.",
        solution: "An interactive advisory system guiding users through targeted questions to recommend optimal configurations.",
        tech: "Robust decision logic for hardware filtering coupled with an intuitive UI."
      }
    ]
  },

  maha: {
    eyebrow: "Pillar four",
    title: "Vision &amp; Ambition",
    lead: "High passion and boundless technical ambition. Proven excellence in winning hackathons and coding competitions through the College of Computer Science and Engineering Club. An active individual driven by continuous learning, fluent in three languages, with an exceptional technical vision believing that coding is a tool to create real impact.",
    shortTitle: "In Short",
    shortText: "I believe great software must be smart, precise, and impactful. My core passion lies in building intelligent systems and AI Agents that solve real-world problems. I focus on fine details, always turning complex ideas into clean, robust code that drives real value.",
    factsLabel: "What drives the work",
    facts: [
      { b: "High passion, boundless technical ambition", p: "" },
      { b: "Proven excellence in hackathons and coding competitions", p: "Through the College of Computer Science and Engineering Club." },
      { b: "Driven by continuous learning", p: "" },
      { b: "Fluent in three languages", p: "Arabic · English · French" },
      { b: "Coding is a tool to create real impact", p: "" }
    ]
  },

  services: {
    eyebrow: "Working together",
    title: "What Can I Build For You?",
    lead: "Some of what I can build for you — and there's more where that came from.",
    items: [
      {
        t: "Generative AI Agents",
        d: "Agents that use tools, plan their own steps and arrive at an answer — with the decision logic kept in code where it can be read and tested, not buried in a prompt.",
        e: "Evidence — PC Advisor (LangGraph ReAct agent) · IBM Skills Build: Applied AI Agents, Chat Bots &amp; RAG"
      },
      {
        t: "Intelligent Systems Simulating Human Reasoning",
        d: "Systems that follow a chain of rules a person could check, then let a model explain the outcome in plain language — so the answer is defensible, not merely fluent.",
        e: "Evidence — Clean Beauty: scores computed as pure functions, AI narrates only"
      },
      {
        t: "RAG Systems",
        d: "Answers grounded in your own material rather than a model\u2019s memory, with the source of each claim shown alongside it.",
        e: "Evidence — IBM Skills Build: Applied AI Agents, Chat Bots &amp; RAG"
      },
      {
        t: "Cross-Platform Mobile Apps (Android &amp; iOS via Flutter)",
        d: "iOS and Android from a single Flutter codebase with Firebase behind it — authentication, live data, push notifications, cloud functions, and role-based access for several kinds of user at once.",
        e: "Evidence — SANNAD: five user roles, real-time alerts, Arabic and English"
      },
      {
        t: "Integrated Digital Web Interfaces (React / Next.js)",
        d: "Typed APIs with modern React front ends, or static pages that outlive every framework. Genuinely bilingual, with right-to-left support built in rather than bolted on.",
        e: "Evidence — My Path (live on its own domain) · Clean Beauty (Next.js + FastAPI)"
      },
      {
        t: "Data Pipeline &amp; Processing Automation",
        d: "Parsing, matching and scoring work that runs the same way every time — deterministic pipelines with the model kept out of the path where a wrong answer would cost something.",
        e: "Evidence — Clean Beauty: curated ingredient entries matched through hundreds of aliases in three passes"
      }
    ]
  },

  closer: {
    eyebrow: "The Next Chapter…",
    /* Each pillar closes on its own thought. The em half is the
       phrase the accent lands on. */
    statements: {
      engineer: { t: "I believe real experience isn't measured in years on the job, but in the capacity to learn and adapt to ",
                  em: "constant change." },
      creator:  { t: "Continuous experimentation and a willingness to take on challenges are the real fuel behind any ",
                  em: "genuine professional growth." },
      solver:   { t: "When a problem has no conventional solution, thinking outside the box is what turns ",
                  em: "an obstacle into an opportunity." },
      maha:     { t: "I believe real passion begins the moment we stop passing knowledge on, ",
                  em: "and start making it." }
    }
  }
};
