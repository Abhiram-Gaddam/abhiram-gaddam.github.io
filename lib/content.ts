// export type ProjectStatus = "live" | "code-complete" | "archived";

// export interface Project {
//   id: string;
//   name: string;
//   what: string;
//   highlights: string[];
//   problem: string;
//   role: string;
//   stack: string;
//   decisions: string;
//   impact: string;
//   links: string;
//   status: ProjectStatus;
//   /** Paid client work vs. a self-initiated project — shown as a small tag on the card. */
//   origin: "freelance" | "personal";
//   /** Optional path to a real screenshot, e.g. "/projects/eaap.png".
//    * Leave empty and the site shows a clean placeholder instead. */
//   image?: string;
// }

// export interface SkillCategory {
//   category: string;
//   stack: string;
//   depth: "Production-ready" | "Comfortable" | "Learning";
//   /** Short story shown when the tile expands on hover (desktop) or tap (mobile). */
//   story: string;
//   /** Optional link to a project that proves this — usually a case-study page. */
//   proofLink?: { label: string; href: string };
// }

// export interface ExperienceEntry {
//   id: string;
//   org: string;
//   role: string;
//   period: string;
//   bullets: string[];
//   /** Optional screenshots for this role, e.g. ["/experience/eaap-1.png"].
//    * Leave empty and the site shows a clean placeholder instead. */
//   images?: string[];
// }

// export interface Content {
//   positioning: {
//     targetRoles: string;
//     oneLiner: string;
//   };
//   hero: {
//     name: string;
//     preferredName: string;
//     title: string;
//     subheadline: string;
//     ctaLabel: string;
//     ctaHref: string;
//     /** Short punchy line shown in a floating speech-bubble badge next to the photo. */
//     badge: string;
//     /** Playful, human tags shown in the "Powered by" card. */
//     poweredBy: string[];
//     /** Optional path to a real photo, e.g. "/hero-photo.jpg". Leave empty for a placeholder. */
//     photo?: string;
//   };
//   skills: SkillCategory[];
//   projects: Project[];
//   experience: ExperienceEntry[];
//   achievements: string[];
//   resumeLink: string;
//   contact: {
//     email: string;
//     linkedin: string;
//     github: string;
//   };
//   personal: {
//     originStory: string;
//     background: string;
//     whyAI: string;
//     nonTechInterests: string;
//     includePhoto: boolean;
//   };
// }

// export const defaultContent: Content = {
//   positioning: {
//     targetRoles:
//       "Associate Software Developer · Junior Full-Stack Developer · GenAI Developer",
//     oneLiner:
//       "A recent grad who'd rather show you what I've built than tell you what I could build.",
//   },
//   hero: {
//     name: "Gaddam Bhanu Venkata Abhiram",
//     preferredName: "Abhiram",
//     title: "Recent grad, already freelancing.",
//     subheadline:
//       "I turn messy workflows into clean digital systems. While finishing my degree, I shipped three production platforms for real clients — from a statewide medical association portal to a full property valuation pipeline.",
//     ctaLabel: "Connect on LinkedIn",
//     ctaHref: "https://www.linkedin.com/in/abhiramgaddam/",
//     badge: "Student on paper. Builder everywhere else.",
//     poweredBy: ["2 AM debugging", "Free-tier GPU quota", "One more feature", "Badminton smashes"],
//     photo: "/GaddamAbhiram.jpg",
//   },
//   skills: [
//     {
//       category: "Full Stack",
//       stack: "Next.js, Node.js — the backbone of everything I've shipped",
//       depth: "Comfortable",
//       story:
//         "Every real product I've shipped runs on this stack — EAAP's auth and payments, the property valuation tool's multi-step forms, Global Academy's admin panel. If it needs a database, a login flow, or a webhook that actually has to work, this is what I reach for.",
//       proofLink: { label: "See it in EAAP", href: "/projects/eaap" },
//     },
//     {
//       category: "GenAI / RAG",
//       stack: "LlamaIndex, FAISS, embeddings — retrieval that's actually tuned, not just wired up",
//       depth: "Comfortable",
//       story:
//         "I built a hybrid retrieval pipeline from scratch — BM25 plus embeddings plus a reranker — because plain vector search kept missing the obvious answer. The Invoice Assistant is the production version of that lesson.",
//       proofLink: { label: "See it in Invoice Assistant", href: "/projects/invoice-assistant" },
//     },
//     {
//       category: "Programming",
//       stack: "Java, Python — from coursework to production ML pipelines",
//       depth: "Comfortable",
//       story:
//         "Java got me through coursework and data structures. Python is what I actually build with now — from a fraud model that went from missing every case to catching the overwhelming majority, to every ML pipeline I've touched since.",
//       proofLink: { label: "See it in Fraud Detection", href: "/projects/fraud-detection" },
//     },
//     {
//       category: "Tools & Infra",
//       stack: "Git, GitHub, Vercel, Supabase, AWS S3 — my daily deploy-and-debug kit",
//       depth: "Comfortable",
//       story:
//         "Deploying isn't an afterthought for me. I've debugged a production crash on Vercel under deadline, pinned a dependency version that was breaking the build, and wired up S3 and Supabase enough times that it's muscle memory now.",
//       proofLink: { label: "See it in Property Valuation", href: "/projects/property-valuation" },
//     },
//   ],
//   projects: [
//     {
//       id: "eaap",
//       name: "EAAP",
//       what: "The professional home embryologists in Andhra Pradesh never had — membership, standards, and community, built from a blank slate into something the field actually runs on now.",
//       highlights: [
//         "Role-based dashboards with JWT-protected routes",
//         "Caught and fixed a live unauthenticated API route",
//         "Canvas certificate generator with public verification links",
//         "Razorpay payments, webhook-driven — not client-trusted",
//       ],
//       problem:
//         "Embryologists across Andhra Pradesh had no unified professional platform — membership, events, and knowledge-sharing were handled manually with no central presence to establish standards or connect practitioners.",
//       role: "Developer — designed and built the platform end-to-end, from database schema to deployment, as a freelance project.",
//       stack: "Next.js, TypeScript, Supabase (Postgres + Auth), Razorpay, Framer Motion, AWS S3",
//       decisions:
//         "Built role-based admin and user dashboards with JWT-based route protection (caught and fixed a middleware gap that had left API routes unauthenticated). Designed a canvas-based certificate generator with reusable templates, dynamic placement, and public link-based verification. Integrated Razorpay with webhook-driven status updates instead of client-side confirmation.",
//       impact:
//         "Gave the association a central platform for membership, events, publications, and certification — replacing a fragmented manual process with self-serve tools for admins and members.",
//       links: "https://eaap.in",
//       status: "live",
//       origin: "freelance",
//       // NOTE: fix casing to match your experience.freelance images entry exactly — pick ONE.
//       image: "/ScreenShots/Eaap-1.png",
//     },
//     {
//       id: "global-academy",
//       name: "Global Academy of Embryology",
//       what: "EAAP's sibling platform, built for a different organization with a different job to do — less about payments and publications, more about running events, webinars, and certification smoothly.",
//       highlights: [
//         "Full launch scoped and delivered solo, requirements to handoff",
//         "Admin control panel for organizational management",
//         "Digital certificate validation system",
//         "Event and webinar management built in",
//       ],
//       problem:
//         "Same category of need as EAAP — a professional organization with no unified digital presence for membership, events, and certification.",
//       role: "Sole developer — managed the project end-to-end, from initial launch requirements to final client feature handoff.",
//       // STILL OPEN from earlier — you haven't filled this in yet.
//       stack: "Not yet specified — update via /admin",
//       decisions:
//         "Built a streamlined administrative control panel for organizational management, alongside a secure, integrated digital certificate validation system to authenticate and verify user credentials. Supports event and webinar management.",
//       // STILL OPEN from earlier — you haven't filled this in yet.
//       impact: "Not yet specified — update via /admin",
//       links: "",
//       status: "live",
//       origin: "freelance",
//       image: "/ScreenShots/GAE-1.png",
//     },
//     {
//       id: "property-valuation",
//       name: "Property Valuation Report Platform",
//       what: "A tool that turns a messy, paper-driven inspection process into a clean 3-step pipeline — Site Engineer collects, Drafter writes, Validator signs off — with a document editor that behaves like the real PDF it's replacing.",
//       highlights: [
//         "GeoCoordinatePicker — up to 10 points, reverse geocoded",
//         "React templates styled to replicate a real PDF exactly",
//         "Fixed a production ERR_REQUIRE_ESM crash under deadline",
//         "Validator review flow with send-back-for-revision routing",
//       ],
//       problem:
//         "Valuation report creation was manual and fragmented — site data collection, drafting, and sign-off had no shared system, making the process slow and error-prone with no structured handoff.",
//       role: "Designed and developed the platform end-to-end, from multi-step data-entry forms to the document templating engine to deployment.",
//       stack: "Next.js, TypeScript, Firebase (Storage, Admin SDK), React, browser print-to-PDF",
//       decisions:
//         "Built a multi-step site data-entry form including a GeoCoordinatePicker supporting up to 10 map points with reverse geocoding. Designed a template system where report formats are React components styled to replicate a real PDF, with a sidebar-input / direct-edit toggle. Fixed a broken zoom implementation, built print-to-PDF via an isolated iframe, and resolved a production ERR_REQUIRE_ESM crash by pinning jose@5.9.6. Added a Validator role with an accept/send-for-revision flow.",
//       impact:
//         "Replaced a manual, disjointed report-creation process with a structured 3-stage digital pipeline and a reusable template system.",
//       links: "https://dsk-saas.vercel.app/",
//       status: "live",
//       origin: "freelance",
//       // Removed — this was pointing at GAE-1.png (the wrong project's screenshot).
//       // Add a real screenshot of THIS project when you have one.
//       image: "",
//     },
//     {
//       id: "invoice-assistant",
//       name: "Invoice Assistant",
//       what: "A chat interface that actually understands your receipts — upload a stack of invoices, ask it what you spent on vendors last month, and get a real answer instead of a spreadsheet to dig through.",
//       highlights: [
//         "0.89 F1 on the SROIE OCR benchmark",
//         "LRU cache cut embedding calls by ~70%",
//         "Concurrent LangGraph fetches cut latency by ~30%",
//         "Human-in-the-loop review before anything gets saved",
//       ],
//       problem:
//         "Manually tracking expenses from paper/PDF receipts is tedious; users need to digitize invoices and query spending, stock, and vendor patterns in natural language.",
//       role: "Built the entire system from scratch — FastAPI backend, Supabase integration, OCR pipeline, Gemini API, React frontend, an evaluation harness on SROIE, later refactored into a LangGraph state machine.",
//       stack:
//         "Python, FastAPI, Supabase (PostgreSQL + Storage), PaddleOCR, Google Gemini (2.5-Flash, Gemma-3-12b-it, Embedding-001), LangGraph, Pyngrok, pdf2image, Pillow",
//       decisions:
//         "Two-step human-in-the-loop upload review. Intent-based retrieval so Gemini fetches only relevant data. Vector memory for semantic recall across sessions. Token-bucket rate limiting, LRU embedding cache, and TTL result cache for Gemini free-tier quotas. Concurrent tool execution in LangGraph for parallel memory/DB fetches.",
//       impact:
//         "Micro-average F1 of ~0.89 on the SROIE benchmark. Reduced embedding API calls by ~70% with the LRU cache. Cut chat latency by ~30% via concurrent async fetches.",
//       links: "https://github.com/Abhiram-Gaddam/Invoice-and-Expense-Analysis",
//       status: "code-complete",
//       origin: "personal",
//       // Removed — same GAE-1.png mismatch as above.
//       image: "",
//     },
//     {
//       id: "fraud-detection",
//       name: "Credit Card Fraud Detection",
//       what: "Fraud hides in noise — under 0.2% of transactions. This model finds it anyway: XGBoost tuned against severe class imbalance, pushed from missing every fraud case to catching the overwhelming majority.",
//       highlights: [
//         "Recall jumped from 0% to >85% after adding ADASYN",
//         "ROC-AUC >0.98, accuracy ~99% on balanced test set",
//         "Isolation Forest outlier removal before oversampling",
//         "Deployed as a live demo via Flask + ngrok",
//       ],
//       problem:
//         "Credit card fraud is extremely rare (<0.2% of transactions), making it hard for standard classifiers to detect fraud without overfitting or predicting everything as legitimate.",
//       role:
//         "Built everything — preprocessing (Isolation Forest, ADASYN), model training (XGBoost), evaluation, serialization, and a Flask demo app with ngrok.",
//       stack:
//         "Python, Flask, scikit-learn, XGBoost, imbalanced-learn (ADASYN), Pandas, NumPy, Matplotlib, Seaborn, Pyngrok, Pickle",
//       decisions:
//         "Isolation Forest for outlier removal before oversampling. ADASYN over SMOTE for adaptive synthetic samples near the decision boundary. Dropped Time/Amount in favor of PCA features (V1–V28). XGBoost with scale_pos_weight for a second layer of imbalance handling.",
//       impact:
//         "Accuracy ~99%, ROC-AUC >0.98, Average Precision >0.96, Recall for fraud >0.96. Recall on fraud jumped from 0% to >85% after adding ADASYN.",
//       links: "",
//       status: "code-complete",
//       origin: "personal",
//       // Removed — same GAE-1.png mismatch as above.
//       image: "",
//     },
//   ],
//   experience: [
//     {
//       id: "freelance",
//       org: "Independent Freelance",
//       role: "Full-Stack Developer",
//       period: "",
//       bullets: [
//         "Took 3 platforms from zero to live as sole developer: EAAP, Global Academy of Embryology, and an internal property valuation workflow tool — each one architected, built, and deployed solo.",
//         "The real work wasn't the happy path — it was catching an unauthenticated API route before it became a problem, and untangling a production dependency crash under deadline pressure.",
//       ],
//       // Removed your hero photo from here — this deck should be project screenshots,
//       // not your face. Add real work screenshots when ready; casing must match the
//       // actual files exactly (fix Eaap-1 vs EAAP-1 above first).
//       images: ["/ScreenShots/EAAP-1.png", "/ScreenShots/GAE-1.png"],
//     },
//     {
//       id: "asterisks",
//       org: "Asterisks Inc.",
//       role: "Frontend Developer",
//       period: "",
//       bullets: [
//         "Yetzu — LMS: built student and professor dashboards (classes, assignments, materials, sections).",
//         "Submit Right — publications approval tool: built author, mentor, and head dashboards.",
//         "The Avanya — hotel/resort marketing site: built public-facing pages and booking/wellness flows.",
//         "VITUOR — medical publishing platform: built public pages and dashboard components.",
//         "Dr. Yethindra Vityala — personal site: built the frontend of the public pages (a small contribution to a larger build).",
//       ],
//       images: ["/ScreenShots/yetzu.png", "/ScreenShots/avanya.png"],
//     },
//     {
//       id: "4sightai",
//       org: "4SightAI",
//       role: "Technical Associate (offline internship, 2 months)",
//       period: "",
//       bullets: [
//         "Built two internal tools that took bulk certificate and invitation generation from manual to automated.",
//         "Worked on something with real stakes — turning old, undigitized police records into a searchable system people could actually query instead of hunting through paper.",
//         "Built the pipeline behind that: batches of documents in, Google Cloud Vision API in the middle, structured JSON out — down to who signed what and when.",
//       ],
//       images: ["/ScreenShots/rsvp.png", "/ScreenShots/cert.png"],
//     },
//   ],
//   achievements: [
//     "B.Tech CSBS, R.V.R. & J.C. College of Engineering, Guntur (2022–2026)",
//     "IBM SkillsBuild — Machine Learning (online), including hands-on work on an employee burnout prediction model.",
//   ],
//   resumeLink:
//     "https://drive.google.com/file/d/1J_nCHe3rznwUTX3Cfrn2QfeIKGxKnuWn/view?usp=sharing",
//   contact: {
//     email: "gaddamabhiram53@gmail.com",
//     linkedin: "https://www.linkedin.com/in/abhiramgaddam/",
//     github: "https://github.com/Abhiram-Gaddam",
//   },
//   personal: {
//     originStory:
//       "I'm from Guntur, Andhra Pradesh — grew up curious about how things work, and that curiosity turned into a habit of taking things apart in code instead of just reading about them.",
//     background:
//       "Most of what I actually know, I learned by building something real and watching it break — a payment webhook that failed silently, an auth gap that shouldn't have existed, a memory crash at 2am before a demo. The classroom gave me the fundamentals; production gave me the judgment.",
//     whyAI:
//       "I don't follow AI to keep up with hype — I follow it because the field moves fast enough that sitting still for six months means falling behind. When something looks genuinely useful, I don't just read about it, I build with it until I understand where it actually breaks.",
//     nonTechInterests:
//       "Badminton keeps me sharp — it's fast, it punishes hesitation, and there's no substitute for reflexes built through repetition. I like exploring new places for the same reason I like new codebases: you learn the most when you're a little lost. And I'd rather have one real conversation with someone doing interesting work than scroll past a hundred LinkedIn posts about it.",
//     includePhoto: true,
//   },
// };
export type ProjectStatus = "live" | "code-complete" | "archived";

export interface Project {
  id: string;
  name: string;
  what: string;
  highlights: string[];
  problem: string;
  role: string;
  stack: string;
  decisions: string;
  impact: string;
  links: string;
  status: ProjectStatus;
  /** Paid client work vs. a self-initiated project — shown as a small tag on the card. */
  origin: "freelance" | "personal";
  /** Optional path to a real screenshot, e.g. "/projects/eaap.png".
   * Leave empty and the site shows a clean placeholder instead. */
  image?: string;
}

export interface SkillCategory {
  id?: string;
  category: string;
  stack: string;
  depth: "Production-ready" | "Comfortable" | "Learning";
  /** Short story shown when the tile expands on hover (desktop) or tap (mobile). */
  story: string;
  /** Optional link to a project that proves this — usually a case-study page. */
  proofLink?: { label: string; href: string };
}

export interface ExperienceEntry {
  id: string;
  org: string;
  role: string;
  period: string;
  bullets: string[];
  /** Optional screenshots for this role, e.g. ["/experience/eaap-1.png"].
   * Leave empty and the site shows a clean placeholder instead. */
  images?: string[];
}

export interface JourneyStop {
  id: string;
  title: string;
  period?: string;
  description: string;
}

export interface Content {
  positioning: {
    targetRoles: string;
    oneLiner: string;
  };
  hero: {
    name: string;
    preferredName: string;
    title: string;
    subheadline: string;
    ctaLabel: string;
    ctaHref: string;
    /** Short punchy line shown in a floating speech-bubble badge next to the photo. */
    badge: string;
    /** Playful, human tags shown in the "Powered by" card. */
    poweredBy: string[];
    /** Optional path to a real photo, e.g. "/hero-photo.jpg". Leave empty for a placeholder. */
    photo?: string;
  };
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceEntry[];
  achievements: string[];
  resumeLink: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
  personal: {
    originStory: string;
    background: string;
    whyAI: string;
    nonTechInterests: string;
    includePhoto: boolean;
    journey: JourneyStop[];
  };
}

export const defaultContent: Content = {
  positioning: {
    targetRoles:
      "Associate Software Developer · Junior Full-Stack Developer · GenAI Developer",
    oneLiner:
      "A recent grad who'd rather show you what I've built than tell you what I could build.",
  },
  hero: {
    name: "Gaddam Bhanu Venkata Abhiram",
    preferredName: "Gaddam Abhiram",
    title: "Recent grad, already freelancing.",
    subheadline:
      "I turn messy workflows into clean digital systems. While finishing my degree, I shipped three production platforms for real clients — from a statewide medical association portal to a full property valuation pipeline.",
    ctaLabel: "Connect on LinkedIn",
    ctaHref: "https://www.linkedin.com/in/abhiramgaddam/",
    badge: "Student on paper. Builder everywhere else.",
    poweredBy: ["2 AM debugging", "Free-tier GPU quota", "One more feature", "Badminton smashes"],
    photo: "/GaddamAbhiram.jpg",
  },
  skills: [
    {
      category: "Full Stack",
      stack: "Next.js, Node.js — the backbone of everything I've shipped",
      depth: "Comfortable",
      story:
        "Every real product I've shipped runs on this stack — EAAP's auth and payments, the property valuation tool's multi-step forms, Global Academy's admin panel. If it needs a database, a login flow, or a webhook that actually has to work, this is what I reach for.",
      proofLink: { label: "See it in EAAP", href: "/projects/eaap" },
    },
    {
      category: "GenAI / RAG",
      stack: "LlamaIndex, FAISS, embeddings — retrieval that's actually tuned, not just wired up",
      depth: "Comfortable",
      story:
        "I built a hybrid retrieval pipeline from scratch — BM25 plus embeddings plus a reranker — because plain vector search kept missing the obvious answer. The Invoice Assistant is the production version of that lesson.",
      proofLink: { label: "See it in Invoice Assistant", href: "/projects/invoice-assistant" },
    },
    {
      category: "Programming",
      stack: "Java, Python — from coursework to production ML pipelines",
      depth: "Comfortable",
      story:
        "Java got me through coursework and data structures. Python is what I actually build with now — from a fraud model that went from missing every case to catching the overwhelming majority, to every ML pipeline I've touched since.",
      proofLink: { label: "See it in Fraud Detection", href: "/projects/fraud-detection" },
    },
    {
      category: "Tools & Infra",
      stack: "Git, GitHub, Vercel, Supabase, AWS S3 — my daily deploy-and-debug kit",
      depth: "Comfortable",
      story:
        "Deploying isn't an afterthought for me. I've debugged a production crash on Vercel under deadline, pinned a dependency version that was breaking the build, and wired up S3 and Supabase enough times that it's muscle memory now.",
      proofLink: { label: "See it in Property Valuation", href: "/projects/property-valuation" },
    },
  ],
  projects: [
    {
      id: "eaap",
      name: "EAAP",
      what: "The professional home embryologists in Andhra Pradesh never had — membership, standards, and community, built from a blank slate into something the field actually runs on now.",
      highlights: [
        "Role-based dashboards with JWT-protected routes",
        "Caught and fixed a live unauthenticated API route",
        "Canvas certificate generator with public verification links",
        "Razorpay payments, webhook-driven — not client-trusted",
      ],
      problem:
        "Embryologists across Andhra Pradesh had no unified professional platform — membership, events, and knowledge-sharing were handled manually with no central presence to establish standards or connect practitioners.",
      role: "Developer — designed and built the platform end-to-end, from database schema to deployment, as a freelance project.",
      stack: "Next.js, TypeScript, Supabase (Postgres + Auth), Razorpay, Framer Motion, AWS S3",
      decisions:
        "Built role-based admin and user dashboards with JWT-based route protection (caught and fixed a middleware gap that had left API routes unauthenticated). Designed a canvas-based certificate generator with reusable templates, dynamic placement, and public link-based verification. Integrated Razorpay with webhook-driven status updates instead of client-side confirmation.",
      impact:
        "Gave the association a central platform for membership, events, publications, and certification — replacing a fragmented manual process with self-serve tools for admins and members.",
      links: "https://eaap.in",
      status: "live",
      origin: "freelance",
      // NOTE: fix casing to match your experience.freelance images entry exactly — pick ONE.
      image: "/ScreenShots/Eaap-1.png",
    },
    {
      id: "global-academy",
      name: "Global Academy of Embryology",
      what: "EAAP's sibling platform, built for a different organization with a different job to do — less about payments and publications, more about running events, webinars, and certification smoothly.",
      highlights: [
        "Full launch scoped and delivered solo, requirements to handoff",
        "Admin control panel for organizational management",
        "Digital certificate validation system",
        "Event and webinar management built in",
      ],
      problem:
        "Same category of need as EAAP — a professional organization with no unified digital presence for membership, events, and certification.",
      role: "Sole developer — managed the project end-to-end, from initial launch requirements to final client feature handoff.",
      // STILL OPEN from earlier — you haven't filled this in yet.
      stack: "Not yet specified — update via /admin",
      decisions:
        "Built a streamlined administrative control panel for organizational management, alongside a secure, integrated digital certificate validation system to authenticate and verify user credentials. Supports event and webinar management.",
      // STILL OPEN from earlier — you haven't filled this in yet.
      impact: "Not yet specified — update via /admin",
      links: "",
      status: "live",
      origin: "freelance",
      image: "/ScreenShots/GAE-1.png",
    },
    {
      id: "property-valuation",
      name: "Property Valuation Report Platform",
      what: "A tool that turns a messy, paper-driven inspection process into a clean 3-step pipeline — Site Engineer collects, Drafter writes, Validator signs off — with a document editor that behaves like the real PDF it's replacing.",
      highlights: [
        "GeoCoordinatePicker — up to 10 points, reverse geocoded",
        "React templates styled to replicate a real PDF exactly",
        "Fixed a production ERR_REQUIRE_ESM crash under deadline",
        "Validator review flow with send-back-for-revision routing",
      ],
      problem:
        "Valuation report creation was manual and fragmented — site data collection, drafting, and sign-off had no shared system, making the process slow and error-prone with no structured handoff.",
      role: "Designed and developed the platform end-to-end, from multi-step data-entry forms to the document templating engine to deployment.",
      stack: "Next.js, TypeScript, Firebase (Storage, Admin SDK), React, browser print-to-PDF",
      decisions:
        "Built a multi-step site data-entry form including a GeoCoordinatePicker supporting up to 10 map points with reverse geocoding. Designed a template system where report formats are React components styled to replicate a real PDF, with a sidebar-input / direct-edit toggle. Fixed a broken zoom implementation, built print-to-PDF via an isolated iframe, and resolved a production ERR_REQUIRE_ESM crash by pinning jose@5.9.6. Added a Validator role with an accept/send-for-revision flow.",
      impact:
        "Replaced a manual, disjointed report-creation process with a structured 3-stage digital pipeline and a reusable template system.",
      links: "https://dsk-saas.vercel.app/",
      status: "live",
      origin: "freelance",
      // Removed — this was pointing at GAE-1.png (the wrong project's screenshot).
      // Add a real screenshot of THIS project when you have one.
      image: "",
    },
    {
      id: "invoice-assistant",
      name: "Invoice Assistant",
      what: "A chat interface that actually understands your receipts — upload a stack of invoices, ask it what you spent on vendors last month, and get a real answer instead of a spreadsheet to dig through.",
      highlights: [
        "0.89 F1 on the SROIE OCR benchmark",
        "LRU cache cut embedding calls by ~70%",
        "Concurrent LangGraph fetches cut latency by ~30%",
        "Human-in-the-loop review before anything gets saved",
      ],
      problem:
        "Manually tracking expenses from paper/PDF receipts is tedious; users need to digitize invoices and query spending, stock, and vendor patterns in natural language.",
      role: "Built the entire system from scratch — FastAPI backend, Supabase integration, OCR pipeline, Gemini API, React frontend, an evaluation harness on SROIE, later refactored into a LangGraph state machine.",
      stack:
        "Python, FastAPI, Supabase (PostgreSQL + Storage), PaddleOCR, Google Gemini (2.5-Flash, Gemma-3-12b-it, Embedding-001), LangGraph, Pyngrok, pdf2image, Pillow",
      decisions:
        "Two-step human-in-the-loop upload review. Intent-based retrieval so Gemini fetches only relevant data. Vector memory for semantic recall across sessions. Token-bucket rate limiting, LRU embedding cache, and TTL result cache for Gemini free-tier quotas. Concurrent tool execution in LangGraph for parallel memory/DB fetches.",
      impact:
        "Micro-average F1 of ~0.89 on the SROIE benchmark. Reduced embedding API calls by ~70% with the LRU cache. Cut chat latency by ~30% via concurrent async fetches.",
      links: "https://github.com/Abhiram-Gaddam/Invoice-and-Expense-Analysis",
      status: "code-complete",
      origin: "personal",
      // Removed — same GAE-1.png mismatch as above.
      image: "",
    },
    {
      id: "fraud-detection",
      name: "Credit Card Fraud Detection",
      what: "Fraud hides in noise — under 0.2% of transactions. This model finds it anyway: XGBoost tuned against severe class imbalance, pushed from missing every fraud case to catching the overwhelming majority.",
      highlights: [
        "Recall jumped from 0% to >85% after adding ADASYN",
        "ROC-AUC >0.98, accuracy ~99% on balanced test set",
        "Isolation Forest outlier removal before oversampling",
        "Deployed as a live demo via Flask + ngrok",
      ],
      problem:
        "Credit card fraud is extremely rare (<0.2% of transactions), making it hard for standard classifiers to detect fraud without overfitting or predicting everything as legitimate.",
      role:
        "Built everything — preprocessing (Isolation Forest, ADASYN), model training (XGBoost), evaluation, serialization, and a Flask demo app with ngrok.",
      stack:
        "Python, Flask, scikit-learn, XGBoost, imbalanced-learn (ADASYN), Pandas, NumPy, Matplotlib, Seaborn, Pyngrok, Pickle",
      decisions:
        "Isolation Forest for outlier removal before oversampling. ADASYN over SMOTE for adaptive synthetic samples near the decision boundary. Dropped Time/Amount in favor of PCA features (V1–V28). XGBoost with scale_pos_weight for a second layer of imbalance handling.",
      impact:
        "Accuracy ~99%, ROC-AUC >0.98, Average Precision >0.96, Recall for fraud >0.96. Recall on fraud jumped from 0% to >85% after adding ADASYN.",
      links: "",
      status: "code-complete",
      origin: "personal",
      // Removed — same GAE-1.png mismatch as above.
      image: "",
    },
  ],
  experience: [
    {
      id: "freelance",
      org: "Independent Freelance",
      role: "Full-Stack Developer",
      period: "",
      bullets: [
        "Took 3 platforms from zero to live as sole developer: EAAP, Global Academy of Embryology, and an internal property valuation workflow tool — each one architected, built, and deployed solo.",
        "The real work wasn't the happy path — it was catching an unauthenticated API route before it became a problem, and untangling a production dependency crash under deadline pressure.",
      ],
      
      images: [ "/ScreenShots/Eaap-1.png", "/ScreenShots/GAE-1.png"],
    },
    {
      id: "asterisks",
      org: "Asterisks Inc.",
      role: "Frontend Developer",
      period: "",
      bullets: [
        "Yetzu — LMS: built student and professor dashboards (classes, assignments, materials, sections).",
        "Submit Right — publications approval tool: built author, mentor, and head dashboards.",
        "The Avanya — hotel/resort marketing site: built public-facing pages and booking/wellness flows.",
        "VITUOR — medical publishing platform: built public pages and dashboard components.",
        "Dr. Yethindra Vityala — personal site: built the frontend of the public pages (a small contribution to a larger build).",
      ],
      images: ["/ScreenShots/yetzu.png", "/ScreenShots/avanya.png"],
    },
    {
      id: "4sightai",
      org: "4SightAI",
      role: "Technical Associate (offline internship, 2 months)",
      period: "",
      bullets: [
        "Built two internal tools that took bulk certificate and invitation generation from manual to automated.",
        "Worked on something with real stakes — turning old, undigitized police records into a searchable system people could actually query instead of hunting through paper.",
        "Built the pipeline behind that: batches of documents in, Google Cloud Vision API in the middle, structured JSON out — down to who signed what and when.",
      ],
      images: ["/ScreenShots/rsvp.png", "/ScreenShots/cert.png"],
    },
  ],
  achievements: [
    "B.Tech CSBS, R.V.R. & J.C. College of Engineering, Guntur (2022–2026)",
    "IBM SkillsBuild — Machine Learning (online), including hands-on work on an employee burnout prediction model.",
  ],
  resumeLink:
    "https://drive.google.com/file/d/1J_nCHe3rznwUTX3Cfrn2QfeIKGxKnuWn/view?usp=sharing",
  contact: {
    email: "gaddamabhiram53@gmail.com",
    linkedin: "https://www.linkedin.com/in/abhiramgaddam/",
    github: "https://github.com/Abhiram-Gaddam",
  },
  personal: {
    originStory:
      "I'm from Guntur, Andhra Pradesh — grew up curious about how things work, and that curiosity turned into a habit of taking things apart in code instead of just reading about them.",
    background:
      "Most of what I actually know, I learned by building something real and watching it break — a payment webhook that failed silently, an auth gap that shouldn't have existed, a memory crash at 2am before a demo. The classroom gave me the fundamentals; production gave me the judgment.",
    whyAI:
      "I don't follow AI to keep up with hype — I follow it because the field moves fast enough that sitting still for six months means falling behind. When something looks genuinely useful, I don't just read about it, I build with it until I understand where it actually breaks.",
    nonTechInterests:
      "Badminton keeps me sharp — it's fast, it punishes hesitation, and there's no substitute for reflexes built through repetition. I like exploring new places for the same reason I like new codebases: you learn the most when you're a little lost. And I'd rather have one real conversation with someone doing interesting work than scroll past a hundred LinkedIn posts about it.",
    includePhoto: true,
    journey: [ 
      
      {
        id: "now",
        title: "Now",
        description:
          "Graduated. Job hunting. Still shipping — GenAI pipelines, this portfolio, whatever's next.",
      },
      {
        id: "eaap-stop",
        title: "First freelance client — EAAP",
        description:
          "Took a project from a blank database schema to a platform an entire professional association actually runs on. Still my proudest solo build.",
      },
      {
        id: "asterisks-stop",
        title: "Asterisks Inc.",
        description:
          "First time working inside a team instead of alone. Five-plus client projects, frontend-focused, learning to build within someone else's system.",
      },
      {
        id: "4sightai-stop",
        title: "4SightAI — Technical Associate",
        description:
          "First real internship, real stakes. Built bulk certificate/invitation tools and a document pipeline for a police-records digitization project.",
      },
      {
        id: "college",
        title: "R.V.R. & J.C. College of Engineering",
        period: "2022 – 2026",
        description:
          "B.Tech in CSBS. This is where the fundamentals came from — data structures, systems, the theory I'd later stress-test in production.",
      },
      {
        id: "guntur",
        title: "Guntur, Andhra Pradesh",
        description:
          "Grew up curious about how things work — a habit that turned into taking things apart in code long before I called it 'engineering.'",
      },
    ],
  },
};