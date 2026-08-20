import { Publication, Project, Experience, NewsItem, Award, Language, Hobby, ExtraActivity } from '../types';

export const PUBLICATIONS: Publication[] = [
  {
    id: "01",
    title: "DeFaX: A Cross-Attention Fusion Framework for Robust and Explainable Deepfake Detection",
    authors: "Md Al-Imran, Md Sifatullah Sheikh, Urmi Kirtonia, Nuzath Tabassum Arthi, Shamim Ripon",
    venue: "IEEE Access (SCI, Q1 Journal, Impact Factor 3.9)",
    venueType: "journal",
    link: "https://ieeexplore.ieee.org/abstract/document/11303744",
    highlight: "Built DeFaX, a system that combines two types of AI vision models (a Swin Transformer and an EfficientNet) to spot AI-generated fake face videos and photos. It correctly identified fakes 99.8% of the time on a 140,000-image test set, and — unlike most detection tools — it also shows a visual heatmap explaining exactly which part of the face made it flag something as fake.",
    year: "2025"
  },
  {
    id: "02",
    title: "Medicinal Plant Leaf Image Dataset of 13 Species Collected in Bangladesh",
    authors: "Momena Khatun Zinia, Mahmudul Haque Sakib, Md Sifatullah Sheikh, Urmi Kirtonia, Bashirul Islam, Md Nawab Yousuf Ali",
    venue: "Scientific Data, Nature Portfolio (Currently Under Review)",
    venueType: "journal",
    highlight: "Collected and organized a photo dataset of 13 medicinal plant species grown in Bangladesh. The manuscript describing this dataset is currently under review at Nature's Scientific Data; the dataset itself is already publicly available on Mendeley Data for other researchers to use.",
    year: "2025"
  },
  {
    id: "03",
    title: "AI-Powered Deepfake Detection Using CNN and Vision Transformer Architectures",
    authors: "Md Sifatullah Sheikh, Urmi Kirtonia, Nuzath Tabassum Arthi, Md Al-Imran",
    venue: "IEEE International Conference on Intelligent Big Data, Data Science and Artificial Intelligence (IBDAP), Thailand",
    venueType: "conference",
    link: "https://ieeexplore.ieee.org/abstract/document/11145852",
    highlight: "Compared three different image-recognition AI models plus a newer 'Vision Transformer' model to see which best detects deepfakes. A lightweight version built on MobileNetV3 (named VFDNET) came out on top, achieving strong accuracy while staying efficient enough to run on limited hardware.",
    year: "2025"
  },
  {
    id: "04",
    title: "A Medicinal Plant Leaf Image Dataset of 13 Species Collected in Bangladesh",
    authors: "Momena Khatun Zinia, Mahmudul Haque Sakib, Md Sifatullah Sheikh, Urmi Kirtonia, Bashirul Islam, Md Nawab Yousuf Ali",
    venue: "Mendeley Data, Version 2 (DOI: 10.17632/9tdc9gbtgb.2)",
    venueType: "dataset",
    link: "https://data.mendeley.com/datasets/9tdc9gbtgb/2",
    highlight: "The public, downloadable version of the medicinal plant photo dataset above — high-resolution images of 13 species, freely available so other researchers can build on it for plant science and biodiversity studies.",
    year: "2026"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "defax",
    title: "DeFaX Framework",
    tag: "AI Safety / Explainable AI",
    description: "A deepfake-detection system, published in IEEE Access (Q1, Impact Factor 3.9), that doesn't just say 'fake' or 'real' — it also shows why, by highlighting exactly which parts of a face look manipulated.",
    longDescription: "Most deepfake detectors work like a black box: they give you an answer with no explanation. DeFaX fixes that. It combines two AI vision models — a Swin Transformer and an EfficientNet — using a custom mechanism that lets them share information about the image. On top of accurate detection, it generates a visual 'heatmap' (using two explainability techniques, Grad-CAM and LIME) that shows a human reviewer exactly which facial region triggered the fake/real decision — useful for anyone who needs to verify or trust the result, not just receive it.",
    features: [
      "Combines two AI models (Swin Transformer + EfficientNet) so each one's strengths cover the other's blind spots",
      "A custom 'cross-attention' mechanism that lets the two models compare notes across different zoom levels of the image",
      "Visual explanations (via Grad-CAM and LIME) showing exactly which facial area looked fake — not just a yes/no answer",
      "Stays accurate even on heavily compressed or noisy video, which is where most detectors start to fail",
      "Tested against standard industry benchmarks (FaceForensics++, Celeb-DF) to confirm the results hold up outside the original dataset",
      "Managed as an end-to-end research workflow — dataset curation, preprocessing, model training, ablation studies, and statistical evaluation — with a 5-member research team under faculty supervision"
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
    description: "My undergraduate thesis: a multimodal AI model that identifies medicinal plants from a photo of their leaves, combining image recognition with text understanding for higher accuracy than image-only models.",
    longDescription: "Traditional medicine relies heavily on knowing exactly which plant you're looking at — a mistake can be costly. MediLeafNET was built as my undergraduate thesis to solve this with a multimodal classifier that combines a Vision Transformer (ViT) for image understanding with BERT for text-based context, trained on 3,289 leaf images across 13 species native to Bangladesh. Combining both modalities improved accuracy by 8% over single-modality baselines. The final system is demonstrated through a live Gradio web demo and a Flutter mobile proof-of-concept.",
    features: [
      "Multimodal classifier combining a Vision Transformer (ViT) with BERT, rather than relying on image data alone",
      "Trained and evaluated on 3,289 real leaf images across all 13 documented species",
      "Achieved 96.22% accuracy — an 8% improvement over single-modal (image-only) baseline models",
      "Deployed as a live, testable Gradio web demo",
      "Includes a working Flutter mobile app proof-of-concept for on-the-go identification",
      "Comes paired with a reference database explaining the traditional medicinal use of each species"
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
    description: "A clinical support tool that looks at a photo of a skin condition, identifies what it might be, and generates an easy-to-read summary — combining computer vision with AI-written medical explanations.",
    longDescription: "SkinCare AI pairs image recognition with plain-language explanation. A YOLOv8 model first localizes the exact skin lesion in the photo at 95.42% mAP, then three vision models (EfficientNetB0, MobileNetV2, and ResNet50) vote together on what the condition looks like, across ten possible categories. A language model then converts that technical finding into a plain-text summary a patient can actually understand — bridging the gap between 'the AI detected something' and 'here's what that means for you.' The full pipeline is deployed via FastAPI, Streamlit, and Docker.",
    features: [
      "YOLOv8-based lesion localization achieving 95.42% mAP, pinpointing the exact affected area before classification",
      "Sorts skin conditions into 10 categories from a single photo",
      "Three AI models vote together on the diagnosis, which is more reliable than trusting just one",
      "Uses an AI language model to turn the technical result into a plain-language explanation for the patient",
      "Automatically generates a downloadable PDF summary of the findings",
      "Fully containerized deployment via FastAPI, Streamlit, and Docker"
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
    description: "A full e-commerce platform where many independent sellers each run their own storefront under one system — with each seller's data kept completely separate, plus built-in sales analytics.",
    // NOTE: kept as PostgreSQL + Drizzle ORM (internally consistent, since Drizzle is a SQL-first ORM).
    // Your resume lists MongoDB instead — this is a real conflict, not a wording difference. Confirm which is correct.
    longDescription: "Bazario lets many sellers operate independent shops on one platform without their data ever mixing — each seller gets their own subdomain and isolated database space. It handles live product catalogs, real-time inventory, vendor dashboards, and Stripe Connect payment integration so each vendor can accept payments directly through their own storefront.",
    features: [
      "Every seller's data and subdomain are kept fully separate from every other seller's, even though they share one platform",
      "Inventory counts update instantly and safely, even when many customers are buying the same item at once",
      "Individual vendor dashboards where each seller can track their own daily sales trends",
      "Built-in Stripe Connect payment integration so sellers can accept payments directly through their storefront"
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
      "Evaluated machine learning models using Python, performing data preprocessing, feature engineering, and model validation on real-world datasets.",
      "Conducted model performance analysis and experimentation, optimizing algorithms and workflows to improve prediction accuracy and support production-oriented ML solutions."
    ],
  },
  {
    id: "exp-2",
    role: "Intern, IT & Operations",
    company: "Banglalink",
    location: "Dhaka, Bangladesh",
    period: "Feb 2026 – May 2026",
    bullets: [
      "Managed 100+ operational documents and maintained IT asset, employee, and database records, ensuring accurate and up-to-date information.",
      "Prepared daily, weekly, and monthly reports by collecting and analyzing departmental data, while supporting hardware, software, and network troubleshooting."
    ],
  },
  {
    id: "exp-1",
    role: "Research Assistant",
    company: "East West University",
    location: "Dhaka, Bangladesh",
    period: "Dec 2024 – Dec 2025",
    bullets: [
      "Benchmarked deep learning architectures for AI-generated face detection on 140K images, identifying complementary strengths between CNN-based local features and transformer-based global contexts.",
      "Designed DeFaX, a cross-attention fusion architecture combining Swin Transformer’s global reasoning with EfficientNet’s local feature extraction to address the limitations of individual architectures.",
      "Managed the end-to-end research workflow, including dataset curation, preprocessing, model training, ablation studies, and statistical evaluation."
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
    longContent: "Joined Nasir Syntax Solution Limited as a Machine Learning Engineer Intern, starting August 1, 2026. Working on machine learning projects and gaining hands-on industry experience in developing and evaluating AI solutions.",
    image: "/files/syntax.png"
  },
  {
    id: "n-2",
    date: "July 2026",
    category: "Publication",
    content: "Published a medicinal plant leaf image dataset covering 13 species collected in Bangladesh, on Mendeley Data (Version 2).",
    longContent: "Working with local botanists and fellow researchers, we released a high-resolution collection of leaf photos from 13 medicinally important plant species. The dataset is freely available on Mendeley Data, while the accompanying manuscript is currently under review at Nature's Scientific Data.",
    image: "/files/datasets_13.png",
    link: "https://data.mendeley.com/datasets/9tdc9gbtgb/2",
    linkText: "View Mendeley Dataset"
  },
  {
    id: "n-6",
    date: "May 2026",
    category: "Career",
    content: "Completed a 4-month internship in IT & Operations at Banglalink, Dhaka.",
    longContent: "Worked across IT and Operations, managing 100+ operational documents and preparing daily, weekly, and monthly reports drawing on data from multiple departments. Maintained IT asset inventories and employee records, supported the IT team on hardware, software, and network troubleshooting, and helped develop SOPs and technical documentation for the team.",
    image: "/files/Certificate_Intern_Sifatullah_Sheikh.png"
  },
  {
    id: "n-1",
    date: "February 2026",
    category: "Academic",
    content: "Graduated with a Bachelor of Science in Computer Science & Engineering from East West University.",
    longContent: "Completed the four-year engineering program with honors. My final-year thesis, MediLeafNET, focused on multimodal plant identification, supervised and evaluated by the department's faculty.",
    image: "/files/graduation.jpg"
  },
  {
    id: "n-3",
    date: "December 2025",
    category: "Publication",
    content: "Our main research paper, 'DeFaX: A Cross-Attention Fusion Framework for Robust and Explainable Deepfake Detection,' was accepted and published in IEEE Access, a top-tier Q1 journal.",
    longContent: "This is our flagship contribution to AI safety research. By combining Swin Transformer and CNN models through a custom attention mechanism, DeFaX sets a strong benchmark for catching AI-generated face manipulations, while also producing clear visual explanations for every decision it makes.",
    image: "/files/framework.png",
    link: "https://ieeexplore.ieee.org/abstract/document/11303744",
    linkText: "Read Q1 IEEE Paper"
  },
  {
    id: "n-4",
    date: "August 2025",
    category: "Event",
    content: "Presented our research, 'AI-Powered Deepfake Detection Using CNN and Vision Transformer Architectures,' at the IEEE IBDAP Conference in Thailand.",
    longContent: "Traveled to Thailand to give an oral presentation on our custom CNN-Transformer hybrid model, VFDNET. Spent the conference exchanging ideas with international researchers on where AI-generated media detection and explainable AI are headed next.",
    image: "/files/conference.png",
    link: "https://ieeexplore.ieee.org/abstract/document/11145852",
    linkText: "Read IBDAP Proceeding"
  },
  {
    id: "n-5",
    date: "December 2024",
    category: "Award",
    content: "Won 3rd place nationally in the IT Olympiad at National Robo-Fest 2024.",
    longContent: "Represented our university in a nationwide competition covering algorithms, systems troubleshooting, and digital logic design — finishing 3rd out of hundreds of undergraduate engineering teams from across the country.",
    image: "/files/ROBOTICS.jpg"
  },
];
export const EXTRA_ACTIVITIES: ExtraActivity[] = [
  {
    id: "ea-1",
    role: "Undergraduate Student Mentor",
    organization: "Dept of CSE, East West University",
    period: "2024 – 2025",
    description: "Helped first- and second-year students get comfortable with the core fundamentals of computer science.",
    bullets: [
      "Ran voluntary peer-learning sessions in Data Structures, C++, and Object-Oriented Design, supporting more than 40 junior students.",
      "Worked alongside professors to help students debug code, understand memory management, and reason about runtime efficiency (Big O complexity)."
    ],
    badge: "Teaching"
  },
  {
    id: "ea-2",
    role: "Voluntary Co-Organizer",
    organization: "EWU Computer Club (EWUCC)",
    period: "2023 – 2025",
    description: "Helped run technical workshops, programming contests, and coding bootcamps for the university community.",
    bullets: [
      "Handled logistics and lab setup for national programming contests hosted at East West University, making sure the network and testing systems ran smoothly throughout.",
      "Managed announcements and student sign-ups for Python and machine learning bootcamps."
    ],
    badge: "Leadership"
  },
  {
    id: "ea-3",
    role: "Competitive Coding Coach",
    organization: "Academic Student Groups",
    period: "2024 – 2026",
    description: "Coached junior students preparing for competitive programming contests and local algorithm olympiads.",
    bullets: [
      "Put together practice problem sets covering dynamic programming, graph traversal, and greedy algorithms.",
      "Reviewed students' submitted solutions on mock judges, focusing on runtime efficiency and catching edge cases."
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
    description: "Helped organize technical events and workshops for the university's robotics community.",
    bullets: [
      "Organized technical events and hands-on workshops as part of the club's executive team.",
      "Coordinated with fellow members to plan and run robotics-focused activities for the student community."
    ],
    badge: "Leadership"
  },
  {
    id: "ea-5",
    // ASSUMPTION: period not specified in resume — same estimate as above, please confirm.
    role: "Core Member",
    organization: "LMH Foundation",
    period: "2023 – 2025",
    description: "Volunteered with a community foundation supporting underprivileged families in Bangladesh.",
    bullets: [
      "Coordinated food and clothing drives for underprivileged communities as a core organizing member."
    ],
    badge: "Volunteering"
  }
];

export const HOBBIES: Hobby[] = [
  {
    name: "Strategic Chess",
    category: "Cognitive",
    description: "I enjoy playing chess to improve logical thinking, strategic planning, and problem-solving. The game challenges me to think several moves ahead and make decisions under pressure.",
    iconName: "Compass"
  },
  {
    name: "Strength Training & Fitness",
    category: "Health",
    description: "I regularly work out at the gym and enjoy strength training combined with cardio. Fitness helps me stay disciplined, focused, and maintain a healthy balance alongside research and programming.",
    iconName: "Dumbbell"
  },
  {
    name: "Football",
    category: "Sports",
    description: "I enjoy playing football with friends whenever I have the opportunity. The sport keeps me active while strengthening teamwork, communication, and decision-making skills.",
    iconName: "Trophy"
  },
  {
    name: "Photography",
    category: "Creative",
    description: "I like capturing nature, landscapes, and everyday moments through photography. It allows me to appreciate details, explore creativity, and preserve memorable experiences.",
    iconName: "Camera"
  }
];

export const AWARDS: Award[] = [
  { icon: "🥉", title: "National Robo-Fest", sub: "3rd Place IT Olympiad, 2024" },
  { icon: "🏆", title: "Dean's List Scholarship", sub: "East West University — 3 consecutive semesters (2023–2025)" },
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