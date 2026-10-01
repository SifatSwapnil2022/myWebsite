import { Publication, Project, Experience, NewsItem, Award, Language, Hobby, ExtraActivity } from '../types';

export const PUBLICATIONS: Publication[] = [
  {
    id: "01",
    title: "DeFaX: A Cross-Attention Fusion Framework for Robust and Explainable Deepfake Detection",
    authors: "Md Al-Imran, Md Sifatullah Sheikh, Urmi Kirtonia, Nuzath Tabassum Arthi, Shamim Ripon",
    venue: "IEEE Access (Q1 Journal)",
    venueType: "journal",
    link: "https://ieeexplore.ieee.org/abstract/document/11303744",
    highlight: "We combined a Swin Transformer and an EfficientNet with cross-attention to detect AI-generated faces. The model reached 99.8% accuracy on a 140K-image dataset and uses Grad-CAM and LIME heatmaps to show which parts of the face each prediction was based on.",
    year: "2025"
  },
  {
    id: "02",
    title: "Medicinal Plant Leaf Image Dataset of 13 Species Collected in Bangladesh",
    authors: "Momena Khatun Zinia, Mahmudul Haque Sakib, Md Sifatullah Sheikh, Urmi Kirtonia, Bashirul Islam, Md Nawab Yousuf Ali",
    venue: "Scientific Data, Nature Portfolio (Under Review)",
    venueType: "journal",
    highlight: "A data paper describing the leaf images of 13 medicinal plant species we collected in Bangladesh. The paper is under review at Scientific Data, and the dataset is already public on Mendeley Data.",
    year: "2025"
  },
  {
    id: "03",
    title: "AI-Powered Deepfake Detection Using CNN and Vision Transformer Architectures",
    authors: "Md Sifatullah Sheikh, Urmi Kirtonia, Nuzath Tabassum Arthi, Md Al-Imran",
    venue: "IEEE International Conference on Intelligent Big Data, Data Science and Artificial Intelligence (IBDAP), Thailand",
    venueType: "conference",
    link: "https://ieeexplore.ieee.org/abstract/document/11145852",
    highlight: "We compared three CNN models and a Vision Transformer for deepfake detection. Our lightweight MobileNetV3-based model, VFDNET, performed best while staying small enough to run on limited hardware.",
    year: "2025"
  },
  {
    id: "04",
    title: "A Medicinal Plant Leaf Image Dataset of 13 Species Collected in Bangladesh",
    authors: "Momena Khatun Zinia, Mahmudul Haque Sakib, Md Sifatullah Sheikh, Urmi Kirtonia, Bashirul Islam, Md Nawab Yousuf Ali",
    venue: "Mendeley Data, Version 2 (DOI: 10.17632/9tdc9gbtgb.2)",
    venueType: "dataset",
    link: "https://data.mendeley.com/datasets/9tdc9gbtgb/2",
    highlight: "The public version of the dataset above: high-resolution leaf images of 13 species, free to download and use.",
    year: "2026"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "defax",
    title: "DeFaX Framework",
    tag: "AI Safety / Explainable AI",
    description: "A deepfake detector published in IEEE Access. Along with the real or fake prediction, it shows which parts of the face the model focused on.",
    longDescription: "Most deepfake detectors give a label with no explanation. In DeFaX, we combined a Swin Transformer, which looks at the face as a whole, with an EfficientNet, which picks up fine local details, and connected them with cross-attention so each model can use what the other sees. We then used Grad-CAM and LIME to produce heatmaps showing which facial regions led to each prediction, so a person can check the result instead of just trusting it.",
    features: [
      "Two backbones, Swin Transformer and EfficientNet, combined so one covers what the other misses",
      "Cross-attention between the two models at multiple feature scales",
      "Grad-CAM and LIME heatmaps that show which facial regions the model relied on",
      "Tested on compressed and noisy inputs to see how well it holds up",
      "Evaluated on FaceForensics++ and Celeb-DF to check performance beyond the training data",
      "Done as a five-person team under faculty supervision, covering data preparation, training, ablation studies, and statistical tests"
    ],
    tech: ["Python", "TensorFlow", "Swin-T", "EfficientNet", "Grad-CAM", "LIME", "OpenCV"],
    metric: "99.80% Accuracy",
    github: "https://github.com/SifatSwapnil2022/Journal_DefaX_codes",
    paperLink: "https://ieeexplore.ieee.org/abstract/document/11303744",
    image: "/files/defax_full.gif",
    iconName: "CheckCircle2",
    videoSrc: ""
  },
  {
    id: "medileaf",
    title: "MediLeafNET",
    tag: "Undergraduate Thesis / Multimodal Computer Vision",
    description: "My undergraduate thesis. It identifies medicinal plants from leaf photos by combining an image model with a text model.",
    longDescription: "In traditional medicine, using the wrong plant can cause real harm, so getting the identification right matters. For my thesis, I built a classifier that combines a Vision Transformer for the leaf image with BERT for text, trained on 3,289 leaf images from 13 species found in Bangladesh. Using both together improved accuracy by 8% over single-modality baselines. I also built a Gradio web demo and a basic Flutter app to try it out.",
    features: [
      "Combines a Vision Transformer (ViT) for images with BERT for text",
      "Trained and tested on 3,289 leaf images from 13 species",
      "96.22% accuracy, 8% higher than single-modality baselines",
      "Web demo built with Gradio",
      "Prototype Flutter app for identifying plants on a phone",
      "Short reference notes on the traditional medicinal use of each species"
    ],
    tech: ["PyTorch", "Python", "Vision Transformer (ViT)", "BERT", "Gradio", "Flutter", "OpenCV"],
    metric: "96.22% Accuracy",
    github: "https://github.com/SifatSwapnil2022/MediLeafNET",
    paperLink: "https://data.mendeley.com/datasets/9tdc9gbtgb/2",
    image: "/files/medileafnet.png",
    iconName: "Cpu",
    videoSrc: ""
  },
  {
    id: "skincare-ai",
    title: "SkinCare AI",
    tag: "Healthcare AI / Computer Vision",
    description: "A project that finds skin lesions in a photo, classifies them, and writes a short plain-language summary of the result.",
    longDescription: "SkinCare AI works in three steps. A YOLOv8 model first finds the lesion in the photo (95.42% mAP). An ensemble of EfficientNetB0, MobileNetV2, and ResNet50 then classifies it into one of ten categories. Finally, a language model turns the result into a short summary that is easier to read than raw model output. I served it with FastAPI and Streamlit and packaged it with Docker. It is a learning project, not a medical tool.",
    features: [
      "YOLOv8 lesion detection (95.42% mAP) before classification",
      "Classifies skin conditions into 10 categories",
      "Ensemble of three CNNs instead of relying on a single model",
      "A language model writes a plain-language summary of the result",
      "Generates a downloadable PDF report",
      "Served with FastAPI and Streamlit, packaged with Docker"
    ],
    tech: ["Python", "FastAPI", "YOLOv8", "TensorFlow", "MongoDB", "Docker", "Streamlit"],
    metric: "95.42% mAP (Lesion Detection)",
    github: "https://github.com/SifatSwapnil2022/SkinCareAI",
    image: "/files/skinAI.png",
    iconName: "HeartPulse",
    videoSrc: ""
  },
  {
    id: "bazario",
    title: "Bazario Marketplace",
    tag: "Full-Stack Development",
    description: "A multi-vendor e-commerce platform where each seller runs their own store on a separate subdomain, with sales dashboards and Stripe payments.",
    // NOTE: kept as PostgreSQL + Drizzle ORM (internally consistent, since Drizzle is a SQL-first ORM).
    // Your resume lists MongoDB instead — this is a real conflict, not a wording difference. Confirm which is correct.
    longDescription: "Bazario lets multiple sellers run their own shops on one platform. Each seller gets a subdomain, and their data is kept separate from other sellers. It includes product catalogs, inventory tracking, seller dashboards, and Stripe Connect so each seller can take payments directly.",
    features: [
      "Each seller has their own subdomain, with data kept separate per seller",
      "Inventory stays correct when several customers buy the same item at once",
      "Seller dashboards showing daily sales",
      "Stripe Connect payments for each store"
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "TypeScript", "Drizzle ORM"],
    metric: "50+ Active Tenants",
    github: "https://github.com/SifatSwapnil2022/bazario-A-multi-tenant-Ecommerce-Platform",
    website: "https://bazario.ltd/",
    image: "/files/bazario.png",
    iconName: "Layers",
    videoSrc: ""
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-3",
    role: "ML Engineer Intern",
    company: "Syntax Solution Limited",
    location: "Dhaka, Bangladesh",
    period: "Aug 2026 – Present",
    bullets: [
      "Preprocess data, build features, and train and validate ML models in Python on real-world datasets.",
      "Run experiments to compare models and improve prediction accuracy for production use."
    ],
  },
  {
    id: "exp-2",
    role: "Intern, IT & Operations",
    company: "Banglalink",
    location: "Dhaka, Bangladesh",
    period: "Feb 2026 – May 2026",
    bullets: [
      "Managed 100+ operational documents and kept IT asset, employee, and database records up to date.",
      "Prepared daily, weekly, and monthly reports from departmental data, and helped with hardware, software, and network issues."
    ],
  },
  {
    id: "exp-1",
    role: "Research Assistant",
    company: "East West University",
    location: "Dhaka, Bangladesh",
    period: "Dec 2024 – Dec 2025",
    bullets: [
      "Benchmarked CNN and transformer models for AI-generated face detection on a 140K-image dataset, and found that CNNs pick up local details while transformers capture global context.",
      "Designed DeFaX, which combines a Swin Transformer and an EfficientNet through cross-attention to get the benefits of both.",
      "Handled the full research process: dataset curation, preprocessing, training, ablation studies, and statistical evaluation."
    ],
    supervisor: {
      name: "Al Imran",
      title: "Senior Lecturer, Department of CSE",
      email: "al.imran@ewubd.edu",
      profileUrl: "https://fse.ewubd.edu/computer-science-engineering/faculty-view/al.imran"
    }
  }
];

export const NEWS: NewsItem[] = [
  {
    id: "n-7",
    date: "August 2026",
    category: "Career",
    content: "Joined Nasir Syntax Solution Limited as a Machine Learning Engineer Intern.",
    longContent: "Started on August 1, 2026. I work on building and evaluating ML models for the company's projects.",
    image: "/files/syntax.png"
  },
  {
    id: "n-2",
    date: "July 2026",
    category: "Publication",
    content: "Published a leaf image dataset of 13 medicinal plant species from Bangladesh on Mendeley Data (Version 2).",
    longContent: "Together with my co-authors, I released high-resolution leaf images of 13 medicinal plant species. The dataset is free to use on Mendeley Data, and the paper describing it is under review at Scientific Data.",
    image: "/files/datasets_13.png",
    link: "https://data.mendeley.com/datasets/9tdc9gbtgb/2",
    linkText: "View dataset"
  },
  {
    id: "n-6",
    date: "May 2026",
    category: "Career",
    content: "Completed a 4-month internship in IT & Operations at Banglalink, Dhaka.",
    longContent: "I managed 100+ operational documents, prepared daily, weekly, and monthly reports from different departments, and kept IT asset and employee records up to date. I also helped the IT team with hardware, software, and network issues and helped write SOPs and documentation.",
    image: "/files/Certificate_Intern_Sifatullah_Sheikh.png"
  },
  {
    id: "n-1",
    date: "February 2026",
    category: "Academic",
    content: "Graduated with a Bachelor of Science in Computer Science & Engineering from East West University.",
    longContent: "Finished my four-year CSE degree. My thesis was MediLeafNET, a multimodal model for identifying medicinal plants.",
    image: "/files/graduation.jpg"
  },
  {
    id: "n-3",
    date: "December 2025",
    category: "Publication",
    content: "Our paper 'DeFaX: A Cross-Attention Fusion Framework for Robust and Explainable Deepfake Detection' was published in IEEE Access.",
    longContent: "DeFaX combines a Swin Transformer and an EfficientNet through cross-attention to detect AI-generated faces, and uses heatmaps to show what each prediction is based on. It was the main project from my time as a research assistant.",
    image: "/files/framework.png",
    link: "https://ieeexplore.ieee.org/abstract/document/11303744",
    linkText: "Read the paper"
  },
  {
    id: "n-4",
    date: "August 2025",
    category: "Event",
    content: "Presented our paper 'AI-Powered Deepfake Detection Using CNN and Vision Transformer Architectures' at IEEE IBDAP in Thailand.",
    longContent: "Gave an oral presentation on VFDNET, our lightweight deepfake detection model, and talked with other researchers working on media forensics and explainable AI.",
    image: "/files/conference.png",
    link: "https://ieeexplore.ieee.org/abstract/document/11145852",
    linkText: "Read the paper"
  },
  {
    id: "n-5",
    date: "December 2024",
    category: "Award",
    content: "Won 3rd place in the IT Olympiad at National Robo-Fest 2024.",
    longContent: "Represented East West University in a national competition covering algorithms, systems troubleshooting, and digital logic design, and placed 3rd.",
    image: "/files/ROBOTICS.jpg"
  },
];
export const EXTRA_ACTIVITIES: ExtraActivity[] = [
  {
    id: "ea-1",
    role: "Undergraduate Student Mentor",
    organization: "Dept of CSE, East West University",
    period: "2024 – 2025",
    description: "Helped first- and second-year students with core computer science courses.",
    bullets: [
      "Ran voluntary study sessions on Data Structures, C++, and Object-Oriented Design for more than 40 junior students.",
      "Helped students debug code, understand memory management, and reason about time complexity."
    ],
    badge: "Teaching"
  },
  {
    id: "ea-2",
    role: "Voluntary Co-Organizer",
    organization: "EWU Computer Club (EWUCC)",
    period: "2023 – 2025",
    description: "Helped run workshops, programming contests, and coding bootcamps at the university.",
    bullets: [
      "Handled logistics and lab setup for national programming contests hosted at East West University, including the network and judging systems.",
      "Managed announcements and sign-ups for Python and machine learning bootcamps."
    ],
    badge: "Leadership"
  },
  {
    id: "ea-3",
    role: "Competitive Coding Coach",
    organization: "Academic Student Groups",
    period: "2024 – 2026",
    description: "Coached junior students preparing for programming contests and algorithm olympiads.",
    bullets: [
      "Made practice problem sets on dynamic programming, graph traversal, and greedy algorithms.",
      "Reviewed students' solutions on mock judges, focusing on runtime and edge cases."
    ],
    badge: "Mentorship"
  },
  {
    id: "ea-4",
    // ASSUMPTION: period not specified in resume — estimated to overlap with other university-era activities.
    // Confirm the real dates and I'll correct this.
    role: "Executive Member",
    organization: "East West University Robotics Club",
    period: "2023 – 2025",
    description: "Helped organize events and workshops for the university's robotics club.",
    bullets: [
      "Organized technical events and hands-on workshops as part of the executive team.",
      "Planned and ran robotics activities for students with other club members."
    ],
    badge: "Leadership"
  },
  {
    id: "ea-5",
    // ASSUMPTION: period not specified in resume — same estimate as above, please confirm.
    role: "Core Member",
    organization: "LMH Foundation",
    period: "2023 – 2025",
    description: "Volunteered with a foundation that supports underprivileged families in Bangladesh.",
    bullets: [
      "Helped organize food and clothing drives for families in need."
    ],
    badge: "Volunteering"
  }
];

export const HOBBIES: Hobby[] = [
  {
    name: "Chess",
    category: "Cognitive",
    description: "I play chess in my free time. I like that it rewards patience and thinking a few moves ahead.",
    iconName: "Compass"
  },
  {
    name: "Strength Training",
    category: "Health",
    description: "I go to the gym regularly for strength training and some cardio. It helps me keep a steady routine alongside work and research.",
    iconName: "Dumbbell"
  },
  {
    name: "Football",
    category: "Sports",
    description: "I play football with friends whenever I get the chance. It's a good way to get outside and unwind.",
    iconName: "Trophy"
  },
  {
    name: "Photography",
    category: "Creative",
    description: "I like taking photos of nature, landscapes, and everyday moments, mostly to remember places and small details.",
    iconName: "Camera"
  }
];

export const AWARDS: Award[] = [
  { icon: "🥉", title: "National Robo-Fest", sub: "3rd Place IT Olympiad, 2024" },
  { icon: "🏆", title: "Dean's List Scholarship", sub: "East West University, 3 consecutive semesters (2023–2025)" },
  { icon: "🎯", title: "National ICT Olympiad Bangladesh", sub: "Finalist, 2026" },
  { icon: "⭐", title: "CodeChef Rating", sub: "2-Star competitive programmer" }
];

export const LANGUAGES: Language[] = [
  { label: "English", level: "C1 / Professional Working", width: "85%" },
  { label: "Bengali", level: "Native / Bilingual", width: "100%" }
];

export const SKILL_GROUPS = [
  {
    title: "AI / Machine Learning",
    skills: ["PyTorch", "TensorFlow", "Keras", "Vision Transformers (ViT)", "CNN Backbones", "Hugging Face", "BERT", "OpenCV", "Scikit-learn", "NLP", "Explainable AI (XAI)"]
  },
  {
    title: "Software Engineering",
    skills: ["Python", "C++", "C", "TypeScript", "JavaScript", "SQL"]
  },
  {
    title: "Frontend Frameworks",
    skills: ["React", "Next.js", "Tailwind CSS", "React Native", "Figma", "Framer Motion"]
  },
  {
    title: "Backend & Databases",
    skills: ["Node.js", "Express.js", "Flask", "FastAPI", "REST APIs", "MongoDB", "PostgreSQL"]
  },
  {
    title: "Tools & Cloud / DevOps",
    skills: ["Docker", "Git / GitHub", "CI/CD", "AWS", "n8n", "Google Colab", "LaTeX"]
  }
];