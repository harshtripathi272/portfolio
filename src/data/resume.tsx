import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Harsh Tripathi",
  initials: "DV",
  url: "https://dillion.io",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "I transform ideas into functional, user-friendly products with cutting-edge technology. ",
  summary:
    "I build from the ground up from AI models and edge deployments to full-stack applications. Whether it’s machine learning, web systems, or automation tools, I focus on creating intelligent, real-world solutions that make an impact.",
  avatarUrl: "/me.jpg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "harsht@iitbhilai.ac.in",
    tel: "+919201479878",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/harshtripathi272",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/harsh-tripathi-433393320/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:harsht@iitbhilai.ac.in",
        icon: Icons.email,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Defence Research and Development Organisation (DRDO)",
      href: "#",
      badges: [],
      location: "",
      title: "Intern",
      logoUrl: "/drdo.png",
      start: "May 2025",
      end: "July 2025",
      description:
        "Working on machine translation systems with a focus on Hindi, Chinese, and Burmese. Aiming to build locally deployable, high-accuracy translation models. Evaluating tools like Google Translate, Argos Translate, LibreTranslate, MarianMT with BLEU score analysis.",
    },
    {
      company: "Indian Institute of Technology (IIT), Bhilai",
      badges: [],
      href: "#",
      location: "",
      title: "Research Intern (Railway Drone Project)",
      logoUrl: "/iit_bhilai.png",
      start: "August 2025",
      end: "Present",
      description:
        "Developing and training YOLO models for a real-time railway alert system using drone-based imagery. Optimizing deep learning models for efficient deployment on edge hardware, specifically the NVIDIA Jetson Nano Orin. Responsible for the end-to-end software pipeline, from model development to on-device implementation.",
    },
    {
      company: "Inter-IIT Tech Meet",
      badges: ["12th/23 IITs"],
      href: "#",
      location: "",
      title: "Explainable AI Trading System",
      logoUrl: "/inter_iit.png",
      start: "November 2025",
      end: "December 2025",
      description:
        "Built a real-time algorithmic trading platform using PPO-based Reinforcement Learning. Designed a streaming data pipeline using Pathway and Redis Streams. Implemented multi-agent LLM reasoning with Bull vs Bear agent debates. Achieved 22.3% return and ranked 12th among 23 IITs.",
    },
  ],
  education: [
    {
      school: "Indian Institute of Technology (IIT) Bhilai",
      href: "#",
      degree: "Bachelor of Technology in Electrical Engineering",
      logoUrl: "/iit_bhilai.png",
      start: "2023",
      end: "Present",
    },
    {
      school: "Indore International School",
      href: "#",
      degree: "Senior Secondary (Class 12) – 89.2%",
      logoUrl: "/IIS.png",
      start: "2023",
      end: "2023",
    },
    {
      school: "SICA School",
      href: "#",
      degree: "Secondary (Class 10) – 89%",
      logoUrl: "/SICA.jpeg",
      start: "2021",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "BHC (Balaji Health Care) Business Suite",
      href: "https://bhcmp.store",
      dates: "Jul 2025 - Aug 2025",
      active: true,
      description:
        "A full-stack, AI-enhanced application built to digitize and centralize the entire operational workflow for Balaji Health Care, a medical supply company. It manages inventory (with batch/expiry tracking), orders, and finances, replacing manual processes. The suite features an AI assistant (RAG) for data queries and AI-powered invoice scanning to automate order creation.",
      technologies: [
        "Python",
        "FastAPI",
        "Firestore",
        "LangChain",
        "LlamaIndex",
        "Qdrant",
        "Google Gemini",
        "Tailwind CSS",
        "Shadcn UI",
        "EC2",
        "Twilio",
        "Next.js",
        "TypeScript",
      ],
      links: [
        {
          type: "Live",
          href: "https://bhcmp.store",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Docs",
          href: "https://round-story-935.notion.site/27d2c96307f780b0beadcda0cc649a05",
          icon: <Icons.notion className="size-3" />,
        },
        {
          type: "Github",
          href: "https://github.com/laksh-ya/deploy-bhc",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Demo",
          href: "https://www.youtube.com/watch?v=XTlps8ep0D8",
          icon: <Icons.youtube className="size-3" />,
        }
      ],
      image: "",
      video: "bhc_video.mp4",
    },
    {
      title: "YOLOv11n with Dendritic Optimization",
      href: "#",
      dates: "Perforated AI Hackathon",
      active: true,
      description:
        "Improved YOLOv11n object detection accuracy using PerforatedAI dendritic optimization. Integrated open-source PAI dendrites with a custom YOLO training loop. Achieved +2.30 mAP50 (100% data) and +2.90 mAP50 (50% data) over baseline. Demonstrated 5%+ remaining error reduction and improved data efficiency. Secured 3rd place globally among 693 participants as part of Team Neuron AI.",
      technologies: [
        "Python",
        "PyTorch",
        "YOLOv11n",
        "PerforatedAI Dendrites",
        "Ultralytics",
        "Pascal VOC2007",
        "Computer Vision",
      ],
      links: [],
      image: "",
      video: "",
    },
    {
      title: "OffPay - Offline UPI Payment System",
      href: "#",
      dates: "Oct 2025 - Nov 2025",
      active: true,
      description:
        "A Progressive Web Application that enables offline digital payments by bridging India's *99# USSD payment system with QR code scanning. The app eliminates internet dependency for UPI transactions, making digital payments accessible in low-connectivity areas. Features real-time offline QR detection using client-side processing, automatic UPI data parsing, and seamless USSD integration. Successfully deployed as an installable PWA with complete offline functionality after initial load.",
      technologies: [
        "jsQR",
        "PWA (Service Workers)",
        "WebRTC (Camera API)",
        "Regex Parsing",
        "UPI Integration",
        "USSD Payment Flow",
        "Next.js 16",
      ],
      links: [
        {
          type: "Live",
          href: "https://offpay.vercel.app",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Docs",
          href: "https://round-story-935.notion.site/OffPay-Documentation-2ab2c96307f780a4a169f2fa27796910?pvs=143",
          icon: <Icons.notion className="size-3" />,
        },
        {
          type: "Github",
          href: "https://github.com/laksh-ya/Offpay",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Roast Your Base",
      href: "https://roastyourcocbase.vercel.app/",
      dates: "July 2025",
      active: true,
      description:
        "An AI-powered web application that generates humorous, personalized roasts of Clash of Clans player bases. The tool fetches live player data by integrating with the Royal API proxy (bypassing official API IP restrictions) and uses Google's Gemini AI to analyze player statistics and optional base layout JSON. The project successfully launched to the r/ClashOfClans community, driving over 10,000+ views and significant user engagement.",
      technologies: [
        "Google Gemini AI",
        "Vercel (Serverless Functions)",
        "Clash of Clans API",
        "Royal API (Proxy Integration)",
        "JSON Data Parsing",
        "Next.js",
        "TypeScript",
      ],
      links: [
        {
          type: "Live",
          href: "https://roastyourcocbase.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Github",
          href: "https://github.com/laksh-ya/roast-your-base",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Reddit",
          href: "https://www.reddit.com/r/ClashOfClans/comments/1llmzww/guys_i_made_a_roast_your_base_website/",
          icon: <Icons.reddit className="size-3" />,
        },
        {
          type: "Docs",
          href: "https://hldocs.notion.site/Roast-Your-Base-Project-Documentation-2640357947a0801f8e3ec626f75a46ad?pvs=74",
          icon: <Icons.notion className="size-3" />,
        },
      ],
      image: "",
      video: "roast_your_base.mp4",
    },
    {
      title: "T&C Summarizer",
      href: "#",
      dates: "[Date]",
      active: true,
      description:
        "An AI-powered summarization tool to analyze and simplify dense Terms & Conditions documents. The application uses Google's Gemini AI with few-shot prompting to parse legal text from PDFs or raw input, identify critical risks, and generate actionable advice. The tool is deployed as a public-facing Streamlit web app.",
      technologies: [
        "Python",
        "Google Gemini AI",
        "Google Generative AI SDK",
        "Streamlit",
        "PyPDF2",
        "Prompt Engineering (Few-Shot)",
        "JSON (Structured Output)",
        
      ],
      links: [
        {
          type: "Live",
          href: "https://harsh-tnc.streamlit.app/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Collab",
          href: "https://colab.research.google.com/drive/1EcEwBKEbZXV5GU7yHPlnluknfCxsNVKc#scrollTo=3fMyP9OxgpIM",
          icon: <Icons.collab className="size-3" />,
        },
        {
          type: "Docs",
          href: "https://medium.com/@thebeasts9876/building-a-terms-conditions-summarizer-with-google-gemini-ai-d528ba245d33",
          icon: <Icons.medium className="size-3" />,
        },
        {
          type: "Github",
          href: "https://github.com/harshtripathi272/Tnc-summarizer",
          icon: <Icons.github className="size-3" />,
        },
        


      ],
      image: "",
      video: "tnc_demo.mp4",
    },
    {
      title: "Lunor Translator (DRDO Internship)",
      href: "#",
      dates: "May 2025 - Jul 2025",
      active: true,
      description:
        "Developed a high-accuracy, fully offline, cross-platform multilingual translation application during an internship at the Defence Research and Development Organisation (DRDO). The system uses Meta's NLLB-200 model, achieving a BLEU score of 25.02 for Burmese-to-English, significantly outperforming Google Translate's baseline of 9.14. The application features a Python/FastAPI backend serving the Hugging Face model and a modern desktop UI built with React and Tauri.",
      technologies: [
        "Python",
        "FastAPI",
        "Hugging Face Transformers",
        "NLLB-200 (NLP)",
        "React.js",
        "Next.js",
        "Tauri",
        "Rust",
        "BLEU (Evaluation)",
      ],
      links: [
        {
          type: "Github",
          href: "https://github.com/harshtripathi272/lunor",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Docs",
          href: "https://github.com/harshtripathi272/lunor/blob/main/README.md",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "",
    },
    {
      title: "Lung Disease Classification",
      href: "#",
      dates: "Apr 2025",
      active: true,
      description:
        "A project to classify lung diseases (like Pneumonia and Lung Opacity) from Chest X-rays. The project benchmarked traditional ML pipelines (SIFT, HOG, LBP) against deep learning models, including ResNet50, DenseNet, and a custom ANN. The final custom model achieved 91.2% accuracy, incorporating SMOTE for class imbalance and LIME/SHAP for model explainability.",
      technologies: [
        "Python",
        "Deep Learning (CNN/ANN)",
        "ResNet50",
        "DenseNet",
        "EfficientNet",
        "Scikit-learn (Logistic Regression)",
        "SMOTE",
        "LIME & SHAP",
      ],
      links: [],
      image: "",
      video: "lung_demo.mp4",
    },
    // {
    //   title: "Chat Collect",
    //   href: "https://chatcollect.com",
    //   dates: "Jan 2024 - Feb 2024",
    //   active: true,
    //   description:
    //     "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
    //   technologies: [
    //     "Next.js",
    //     "Typescript",
    //     "PostgreSQL",
    //     "Prisma",
    //     "TailwindCSS",
    //     "Stripe",
    //     "Shadcn UI",
    //     "Magic UI",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://chatcollect.com",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
    // },
    // {
    //   title: "Magic UI",
    //   href: "https://magicui.design",
    //   dates: "June 2023 - Present",
    //   active: true,
    //   description:
    //     "Designed, developed and sold animated UI components for developers.",
    //   technologies: [
    //     "Next.js",
    //     "Typescript",
    //     "PostgreSQL",
    //     "Prisma",
    //     "TailwindCSS",
    //     "Stripe",
    //     "Shadcn UI",
    //     "Magic UI",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://magicui.design",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/magicuidesign/magicui",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video: "https://cdn.magicui.design/bento-grid.mp4",
    // },
    // {
    //   title: "llm.report",
    //   href: "https://llm.report",
    //   dates: "April 2023 - September 2023",
    //   active: true,
    //   description:
    //     "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
    //   technologies: [
    //     "Next.js",
    //     "Typescript",
    //     "PostgreSQL",
    //     "Prisma",
    //     "TailwindCSS",
    //     "Shadcn UI",
    //     "Magic UI",
    //     "Stripe",
    //     "Cloudflare Workers",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://llm.report",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //     {
    //       type: "Source",
    //       href: "https://github.com/dillionverma/llm.report",
    //       icon: <Icons.github className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video: "https://cdn.llm.report/openai-demo.mp4",
    // },
    // {
    //   title: "Automatic Chat",
    //   href: "https://automatic.chat",
    //   dates: "April 2023 - March 2024",
    //   active: true,
    //   description:
    //     "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
    //   technologies: [
    //     "Next.js",
    //     "Typescript",
    //     "PostgreSQL",
    //     "Prisma",
    //     "TailwindCSS",
    //     "Shadcn UI",
    //     "Magic UI",
    //     "Stripe",
    //     "Cloudflare Workers",
    //   ],
    //   links: [
    //     {
    //       type: "Website",
    //       href: "https://automatic.chat",
    //       icon: <Icons.globe className="size-3" />,
    //     },
    //   ],
    //   image: "",
    //   video:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
    // },
  ],
  hackathons: [
  ],
  achievements: [
    {
      slug: "student-innovators-without-borders",
      title: "First Prize - Student Innovators Without Borders Hacks",
      description: "Ranked 1st among 957 participants internationally",
      date: "2026",
      icon: "🥇",
      longDescription: "SafeWander is a comprehensive full-stack application for monitoring and ensuring the safety of dementia patients using real-time tracking, intelligent alerts, and emergency response capabilities. The system features real-time GPS tracking, intelligent geofencing with automatic alerts, an escalating multi-level alert system, and emergency mode for rapid response to missing patients.",
      links: {
        github: "https://github.com/harshtripathi272/safewander",
        devpost: "https://devpost.com/software/safewander-0u7rwh",
        demo: "https://www.youtube.com/watch?v=lWFLmTwNg1I",
      },
      details: {
        event: "Student Innovators Without Borders Hacks",
        placement: "1st Place",
        participants: "957 participants internationally",
        project: "SafeWander - Dementia Patient Monitoring System",
        techStack: [
          "Next.js 15",
          "TypeScript",
          "FastAPI",
          "SQLAlchemy",
          "SQLite",
          "Tailwind CSS",
          "shadcn/ui",
          "Leaflet.js",
          "Python",
          "Pydantic",
        ],
        highlights: [
          "Built a comprehensive full-stack dementia patient monitoring system",
          "Implemented real-time GPS tracking with intelligent geofencing",
          "Created multi-level escalating alert system (Critical/High/Medium/Low)",
          "Developed one-click emergency mode with live location sharing",
          "Built interactive maps with search radius visualization using Leaflet.js",
          "Integrated emergency contact notification system",
          "Implemented patient profiles with medical information and behavioral patterns",
          "Created analytics dashboard with CSV/JSON report exports",
        ],
      },
    },
    {
      slug: "perforated-ai-hackathon",
      title: "Third Prize - International Hackathon by Perforated AI",
      description: "Secured 3rd place among 693 participants globally as part of Team Neuron AI",
      date: "2026",
      icon: "🥉",
      longDescription: "This project demonstrates the application of PerforatedAI's dendritic neural network optimization to YOLOv11n object detection on the Pascal VOC2007 dataset. We proved that dendrite-enhanced networks can achieve higher accuracy on the same data compared to traditional neural networks. Our submission was officially adopted as a base example in PerforatedAI's official repository.",
      links: {
        github: "https://github.com/PerforatedAI/PerforatedAI/tree/main/Examples/baseExamples/yolo-pascal",
        pr: "https://github.com/PerforatedAI/PerforatedAI/pull/93",
      },
      details: {
        event: "International Hackathon by Perforated AI",
        placement: "3rd Place",
        participants: "693 participants globally",
        project: "YOLOv11n with Dendritic Optimization",
        techStack: [
          "Python",
          "PyTorch",
          "YOLOv11n",
          "PerforatedAI Dendrites",
          "Ultralytics",
          "Pascal VOC2007",
          "CUDA",
        ],
        highlights: [
          "Achieved +2.30 mAP50 improvement with 100% training data over baseline",
          "Achieved +2.90 mAP50 improvement with 50% training data over baseline",
          "Demonstrated 5%+ remaining error reduction and improved data efficiency",
          "Implemented custom training loop integrating PAI's dendritic optimization with Ultralytics YOLOv11n",
          "Submission officially adopted as a base example in PerforatedAI's official GitHub repository",
          "Featured adaptive plateau detection (DOING_HISTORY mode) for optimal dendrite addition",
        ],
      },
    },
  ],
} as const;
