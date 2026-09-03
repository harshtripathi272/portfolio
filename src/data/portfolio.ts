// ────────────────────────────────────────────────────────────────────────────
// Content model for the "cutting-mat" homepage.
// Shapes mirror a craft-desk layout: about bullets, a hackathon polaroid wall,
// an experience timeline, and pinned-up project cards.
// ────────────────────────────────────────────────────────────────────────────

export type SocialPlatform = "github" | "linkedin" | "mail" | "twitter" | "resume";

export type SocialLink = {
  id: string;
  platform: SocialPlatform;
  link: string;
  label: string;
};

// An intro line is a list of segments. "hand" segments render in the
// handwritten font + accent colour; "link" segments are underlined links.
export type IntroSegment =
  | { type: "text"; value: string }
  | { type: "hand"; value: string }
  | { type: "link"; label: string; href: string };

export type IntroBullet = {
  id: string;
  segments: IntroSegment[];
};

export type ContentBlock = { text: string; link?: string };

export type Position = {
  title: string;
  duration: string;
  content: ContentBlock[];
};

export type Experience = {
  id: string;
  organisation: string;
  logo?: string;
  initials: string;
  link?: string;
  positions: Position[];
};

export type Education = {
  id: string;
  icon: string;
  title: string;
  degree: string;
  duration: string;
  content: string[];
  link?: string;
};

export type Achievement = {
  id: string;
  icon: string;
  photo?: string;
  event: string;
  position: string;
  highlight: string;
  tint?: string; // polaroid photo-area colour when no photo is supplied
  github?: string;
  live?: string;
  article?: string;
  youtube?: string;
  rotation?: number;
};

export type ProjectStackItem = { name: string };

export type Project = {
  id: string;
  title: string;
  content: string;
  stack: ProjectStackItem[];
  highlight?: string;
  tint?: string;
  github?: string;
  link?: string;
  youtube?: string;
  image?: string;
  video?: string;
};

// ── Identity ────────────────────────────────────────────────────────────────
export const identity = {
  name: "Harsh Tripathi",
  githubUser: "harshtripathi272",
  tagline: [
    "SWE Intern @ Suvir AI",
    "AI + Systems",
    "IIT Bhilai '27",
    "5x Hackathon winner",
  ],
};

// ── Socials ─────────────────────────────────────────────────────────────────
export const socialMedia: SocialLink[] = [
  {
    id: "github",
    platform: "github",
    link: "https://github.com/harshtripathi272",
    label: "GitHub",
  },
  {
    id: "linkedin",
    platform: "linkedin",
    link: "https://www.linkedin.com/in/harsh-tripathi-433393320/",
    label: "LinkedIn",
  },
  {
    id: "mail",
    platform: "mail",
    link: "mailto:harsht@iitbhilai.ac.in",
    label: "Email",
  },
];

// ── About bullets ───────────────────────────────────────────────────────────
export const introBullets: IntroBullet[] = [
  {
    id: "now",
    segments: [
      { type: "text", value: "I am currently a " },
      { type: "hand", value: "Software Engineer Intern" },
      { type: "text", value: " at " },
      { type: "link", label: "Suvir AI", href: "#" },
      {
        type: "text",
        value:
          ", building the backend for an agentic browser that autonomously runs end-to-end web-app testing.",
      },
    ],
  },
  {
    id: "hacks",
    segments: [
      { type: "text", value: "I love " },
      { type: "hand", value: "hackathons" },
      {
        type: "text",
        value: " — 1st/957 at SIWB, 1st/693 at Perforated AI, and a ",
      },
      { type: "hand", value: "Finalist" },
      { type: "text", value: " at Meta PyTorch OpenEnv (top 800 of 31,000+)." },
    ],
  },
  {
    id: "research",
    segments: [
      { type: "text", value: "I interned at " },
      { type: "link", label: "DRDO", href: "https://github.com/harshtripathi272/lunor" },
      { type: "text", value: ", where I built " },
      { type: "hand", value: "Lunor" },
      {
        type: "text",
        value: " — an offline neural translator that beat Google Translate 2.7× on Burmese→English.",
      },
    ],
  },
  {
    id: "study",
    segments: [
      { type: "text", value: "I study " },
      { type: "hand", value: "Electrical Engineering" },
      { type: "text", value: " at " },
      { type: "link", label: "IIT Bhilai", href: "https://www.iitbhilai.ac.in/" },
      { type: "text", value: ", building at the intersection of AI and systems." },
    ],
  },
  {
    id: "fun",
    segments: [
      { type: "text", value: "Fun fact: I ship a lot — " },
      { type: "hand", value: "25+ projects" },
      {
        type: "text",
        value: " spanning fine-tuned LLMs, multi-agent systems, and offline-first apps.",
      },
    ],
  },
];

// ── Experience ──────────────────────────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: "suvir",
    organisation: "Suvir AI",
    initials: "SU",
    link: "#",
    positions: [
      {
        title: "Software Engineer Intern (Backend)",
        duration: "Feb 2026 – Present",
        content: [
          {
            text: "Building the backend for an AI agentic browser that autonomously performs end-to-end web-application testing, replacing manually written test scripts.",
          },
          {
            text: "Developing scalable, event-driven services and APIs that drive an LLM agent to navigate, validate web UIs, and report failures with reproducible traces.",
          },
        ],
      },
    ],
  },
  {
    id: "drdo",
    organisation: "DRDO",
    initials: "DR",
    positions: [
      {
        title: "Research Intern",
        duration: "May 2025 – Jul 2025",
        content: [
          {
            text: "Built Lunor, a fully offline, cross-platform neural machine translation desktop app (Rust/Tauri + Python/FastAPI) serving Meta's NLLB-200.",
            link: "https://github.com/harshtripathi272/lunor",
          },
          {
            text: "Hit a BLEU of 25.02 on Burmese→English — 2.7× Google Translate's 9.14 — benchmarking MarianMT, Argos and LibreTranslate across Hindi, Chinese and Burmese.",
          },
        ],
      },
    ],
  },
  {
    id: "interiit",
    organisation: "Inter-IIT Tech Meet",
    initials: "II",
    positions: [
      {
        title: "Machine Learning Engineer — Explainable AI Trading",
        duration: "Nov 2025 – Dec 2025",
        content: [
          {
            text: "Built a real-time algorithmic trading platform using PPO reinforcement learning — 22.3% return, ranked 12th among 23 IITs.",
          },
          {
            text: "Engineered a streaming pipeline with Pathway + Redis Streams and a multi-agent Bull-vs-Bear LLM debate for explainable trades.",
          },
        ],
      },
    ],
  },
  {
    id: "iitb-drone",
    organisation: "IIT Bhilai",
    initials: "II",
    positions: [
      {
        title: "Research Intern — Railway Drone Project",
        duration: "Aug 2025 – Present",
        content: [
          {
            text: "Training YOLO models for a real-time railway alert system from drone imagery, optimised for edge deployment on the NVIDIA Jetson Orin Nano.",
          },
          { text: "Owning the pipeline end-to-end, from model development to on-device implementation." },
        ],
      },
    ],
  },
];

export const educationList: Education[] = [
  {
    id: "iitb",
    icon: "🎓",
    title: "Indian Institute of Technology (IIT) Bhilai",
    degree: "B.Tech, Electrical Engineering",
    duration: "2023 – 2027",
    content: [
      "Building at the intersection of AI and systems.",
      "Active across hackathons, research, and open source.",
    ],
    link: "https://www.iitbhilai.ac.in/",
  },
];

// ── Hackathons (polaroid wall) ──────────────────────────────────────────────
export const achievements: Achievement[] = [
  {
    id: "siwb",
    icon: "🥇",
    event: "Student Innovators Without Borders",
    position: "1st / 957",
    highlight: "SafeWander — real-time dementia-patient monitoring",
    tint: "#e3b7a6",
    rotation: -3,
    github: "https://github.com/harshtripathi272/Safe-Wander",
    article: "https://devpost.com/software/safewander-0u7rwh",
    youtube: "https://www.youtube.com/watch?v=lWFLmTwNg1I",
  },
  {
    id: "perforated",
    icon: "🥇",
    event: "International Hackathon · Perforated AI",
    position: "1st / 693",
    highlight: "YOLOv11n dendritic optimization — adopted into their repo",
    tint: "#a9c4a2",
    rotation: 4,
    github: "https://github.com/PerforatedAI/PerforatedAI/tree/main/Examples/baseExamples/yolo-pascal",
    article: "https://github.com/PerforatedAI/PerforatedAI/pull/93",
  },
  {
    id: "meta-openenv",
    icon: "🏆",
    event: "Meta · PyTorch · Hugging Face",
    position: "Finalist",
    highlight: "Top 800 of 31,000+ — PII-redaction OpenEnv server",
    tint: "#b7c0dd",
    rotation: -2,
    github: "https://github.com/aayush2789/pii_redaction_env",
  },
  {
    id: "offpay",
    icon: "💸",
    event: "Community Launch",
    position: "200K+ reach",
    highlight: "OffPay — offline UPI payments · 1,000+ upvotes, 420+ installs",
    tint: "#e6cf9c",
    rotation: 3,
    live: "https://offpay.vercel.app",
    github: "https://github.com/laksh-ya/Offpay",
  },
  {
    id: "lemma",
    icon: "🎖️",
    event: "Lemma AI Hackathon",
    position: "6th & 11th / 450",
    highlight: "Two wins among 11 — agents, durable workflows, connectors",
    tint: "#cdb6d6",
    rotation: -4,
    github: "https://github.com/harshtripathi272/lemma-dev-ops",
  },
];

// ── Projects (pinned up) ────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: "verifai",
    title: "VERIFAI",
    content:
      "A 9-agent chest X-ray diagnosis system on a LangGraph state machine — fine-tuned MedGemma-4B (QLoRA/PEFT), adversarial debate, safety guardrails, and human-in-the-loop review.",
    highlight: "Fine-tuned LLM",
    tint: "#7fa7c9",
    stack: [{ name: "PyTorch" }, { name: "QLoRA/PEFT" }, { name: "MedGemma-4B" }, { name: "LangGraph" }],
    github: "https://github.com/harshtripathi272/VERIFAI",
  },
  {
    id: "yolo-dendritic",
    title: "YOLOv11n · Dendritic Optimization",
    content:
      "Integrated PerforatedAI dendrites into a custom YOLOv11n training loop — +2.30 mAP50 (100% data), +2.90 (50%). Adopted as an official base example in the PerforatedAI repo.",
    highlight: "1st / 693",
    tint: "#9ec98f",
    stack: [{ name: "PyTorch" }, { name: "Ultralytics" }, { name: "PerforatedAI" }, { name: "CV" }],
    github: "https://github.com/PerforatedAI/PerforatedAI/tree/main/Examples/baseExamples/yolo-pascal",
  },
  {
    id: "offpay",
    title: "OffPay",
    content:
      "A PWA that bridges India's *99# USSD system with offline QR scanning so UPI payments work with zero internet after first load. Real-time client-side QR detection + UPI parsing.",
    highlight: "Live",
    tint: "#e6cf9c",
    stack: [{ name: "Next.js" }, { name: "jsQR" }, { name: "Service Workers" }, { name: "WebRTC" }],
    link: "https://offpay.vercel.app",
    github: "https://github.com/laksh-ya/Offpay",
  },
  {
    id: "bhc",
    title: "BHC Business Suite",
    content:
      "A full-stack, AI-enhanced ERP digitising inventory, orders and finance for a medical-supply company — RAG assistant for data queries and AI invoice scanning that auto-creates orders.",
    highlight: "Live · Shipped",
    tint: "#d8a0a0",
    stack: [{ name: "FastAPI" }, { name: "LangChain" }, { name: "Qdrant" }, { name: "Next.js" }],
    link: "https://bhcmp.store",
    github: "https://github.com/laksh-ya/deploy-bhc",
    youtube: "https://www.youtube.com/watch?v=XTlps8ep0D8",
    video: "bhc_video.mp4",
  },
  {
    id: "lunor",
    title: "Lunor",
    content:
      "A fully offline, cross-platform neural translator (Rust/Tauri + Python/FastAPI) serving Meta's NLLB-200 — BLEU 25.02 on Burmese→English, 2.7× Google's baseline. Built at DRDO.",
    highlight: "DRDO",
    tint: "#b7c0dd",
    stack: [{ name: "NLLB-200" }, { name: "FastAPI" }, { name: "Tauri" }, { name: "Rust" }],
    github: "https://github.com/harshtripathi272/lunor",
  },
  {
    id: "vesselwatch",
    title: "VesselWatch",
    content:
      "Production-grade oil-spill detection fusing live AIS vessel streams with Sentinel-1 SAR imagery. A deep-learning anomaly detector auto-triggers satellite validation over an event-driven Kafka pipeline.",
    highlight: "Data eng",
    tint: "#8fb9b0",
    stack: [{ name: "Kafka" }, { name: "Airflow" }, { name: "Sentinel-1 SAR" }, { name: "Python" }],
    github: "https://github.com/harshtripathi272/oil-spill-detection",
  },
  {
    id: "flowspeak",
    title: "FlowSpeak",
    content:
      "An always-on-top presenter co-pilot: a 4-agent pipeline hears an audience question and floats the right visual — diagram, table, code — over your screen with sub-second first paint.",
    highlight: "Multi-agent",
    tint: "#d3b9e0",
    stack: [{ name: "TypeScript" }, { name: "Groq Whisper" }, { name: "Cerebras" }, { name: "RAG" }],
    github: "https://github.com/harshtripathi272/FlowSpeaks",
  },
  {
    id: "memora",
    title: "memora",
    content:
      "A typed, version-controlled, provenance-tracked memory store for AI coding agents, written in Rust. Commit beliefs like code, branch before risky runs, roll back, replay. Published on PyPI.",
    highlight: "PyPI · Rust",
    tint: "#c9a98f",
    stack: [{ name: "Rust" }, { name: "PyPI" }, { name: "CLI" }, { name: "Agent infra" }],
    link: "https://pypi.org/project/memora-cli/",
    github: "https://github.com/harshtripathi272/memora",
  },
  {
    id: "reverie",
    title: "Reverie",
    content:
      "Chrome DevTools for AI agents — cognitive observability, replay and comparative debugging. Every thought is an inspectable node rendered in a 3D orb world. On PyPI, 431 passing tests.",
    highlight: "PyPI",
    tint: "#a3b9d6",
    stack: [{ name: "Python" }, { name: "OpenTelemetry" }, { name: "Three.js" }, { name: "PyPI" }],
    link: "https://pypi.org/project/reverie-obs/",
    github: "https://github.com/harshtripathi272/Reverie",
  },
  {
    id: "dia",
    title: "Dia",
    content:
      "An on-device AI companion for Android on Gemma 4 via LiteRT-LM — 8 experiences (chat, vision, automation, voice, handwriting, smart-home) sharing one local model. No cloud, no account.",
    highlight: "On-device",
    tint: "#e0b48f",
    stack: [{ name: "Kotlin" }, { name: "Gemma 4" }, { name: "LiteRT-LM" }, { name: "Offline-first" }],
    github: "https://github.com/laksh-ya/dia",
  },
];
