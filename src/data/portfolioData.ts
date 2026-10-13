import { Publication, Project, Experience, NewsItem, Award, Language, Hobby, ExtraActivity, EducationItem } from '../types';

export const PUBLICATIONS: Publication[] = [
  {
    id: "01",
    title: "DeFaX: A Cross-Attention Fusion Framework for Robust and Explainable Deepfake Detection",
    authors: "Md Al-Imran, Md Sifatullah Sheikh, Urmi Kirtonia, Nuzath Tabassum Arthi, Shamim Ripon",
    venue: "IEEE Access (Q1 Journal)",
    venueType: "journal",
    link: "https://ieeexplore.ieee.org/abstract/document/11303744",
    highlight: "We combined a Swin Transformer and an EfficientNet with cross-attention to detect AI-generated faces. It uses Grad-CAM and LIME heatmaps to show which parts of the face each prediction was based on, so a person can check the call.",
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
    highlight: "We compared three CNNs and a Vision Transformer for telling real faces from GAN-generated ones, on the 140K Real and Fake Faces dataset, and looked at what each model family picks up.",
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

const media = (name: string, caption: string) => ({
  src: `/media/${name}-720.mp4`,
  srcHd: `/media/${name}-1080.mp4`,
  poster: `/media/${name}-poster.jpg`,
  caption,
});

export const PROJECTS: Project[] = [
  {
    id: "defax",
    title: "DeFaX",
    tag: "Deepfake detection, explainable AI",
    group: "research",
    role: "Second author, IEEE Access 2025",
    description: "A deepfake detector published in IEEE Access. Along with the real or fake prediction, it shows which parts of the face the model focused on.",
    longDescription: "Most deepfake detectors give a label with no explanation. In DeFaX, we combined a Swin Transformer, which looks at the face as a whole, with an EfficientNet, which picks up fine local details, and connected them with cross-attention so each model can use what the other sees. We then used Grad-CAM and LIME to produce heatmaps showing which facial regions led to each prediction, so a person can check the result instead of just trusting it.",
    features: [
      "Two backbones, Swin Transformer and EfficientNet, combined so one covers what the other misses",
      "Cross-attention between the two: Swin tokens are the queries, EfficientNet tokens the keys and values",
      "Grad-CAM and LIME heatmaps that show which facial regions the model relied on",
      "Tested on compressed and noisy inputs to see how well it holds up",
      "Evaluated on FaceForensics++ and Celeb-DF to check performance beyond the training data",
      "Done as a five-person team under faculty supervision, covering data preparation, training, ablation studies, and statistical tests"
    ],
    tech: ["Python", "PyTorch", "Swin-T", "EfficientNet", "Grad-CAM", "LIME", "OpenCV"],
    metric: "Shows the evidence behind each prediction",
    github: "https://github.com/SifatSwapnil2022/Journal_DefaX_codes",
    paperLink: "https://ieeexplore.ieee.org/abstract/document/11303744",
    image: "/files/framework.png",
    video: media("defax", "The architecture from the paper, step by step"),
  },
  {
    id: "vfdnet",
    title: "VFDNET",
    tag: "Deepfake detection, model comparison",
    group: "research",
    role: "First author, IEEE IBDAP 2025",
    description: "Our conference paper comparing three CNNs and a Vision Transformer on one task: is this face real or made by a GAN?",
    longDescription: "We trained four image classifiers on the 140K Real and Fake Faces dataset, 70,000 photos from FFHQ and 70,000 StyleGAN faces: VFDNET, MobileNetV3, DFCNET (a small three-layer CNN trained from scratch) and ResNet50. The paper compares how the CNNs, which build up from local detail, and the Transformer, which relates distant parts of the face, handle the task. The notebooks are saved with their outputs. I presented the paper at IEEE IBDAP 2025 in Thailand.",
    features: [
      "VFDNET, a Vision Transformer fine-tuned end to end",
      "MobileNetV3 with transfer learning",
      "DFCNET, a three-layer CNN trained from scratch",
      "ResNet50, fine-tuned",
      "All notebooks saved with their outputs, so the results can be read without rerunning",
      "Oral presentation at IEEE IBDAP 2025, Thailand"
    ],
    tech: ["Python", "PyTorch", "TensorFlow", "Vision Transformer", "MobileNetV3", "ResNet50"],
    metric: "Four models compared on one task",
    github: "https://github.com/SifatSwapnil2022/conf_AI-Powered_Deepfake_Detection_codes",
    paperLink: "https://ieeexplore.ieee.org/abstract/document/11145852",
    image: "/files/conference.png",
    video: media("vfdnet", "The pipeline from the paper and how the four models compare"),
  },
  {
    id: "cholo-puran-dhaka",
    title: "Cholo Puran Dhaka",
    tag: "3D web guide, HCI",
    group: "product",
    role: "Designed and built alone",
    description: "A walkable 3D guide to Old Dhaka for first-time visitors: 40 places, ready-made walking routes, and a card to show your rickshaw driver.",
    longDescription: "The practical details about Old Dhaka are scattered across Facebook posts and old blogs: which day Ahsan Manzil is shut, where the original Nanna Biryani is, whether a car can reach the gate. I live in Gendaria, so these lanes are home ground, and I wanted one place that answers those questions on a map you can walk through. Every place is projected from its real latitude and longitude, landmarks are modelled in code, and the surrounding city of about 30,000 houses is generated with instancing and a custom shader. It is also an HCI question I care about: does a street-level 3D view help people find their way in dense, non-grid lanes better than a flat map?",
    features: [
      "40 places with hours, fees, closed days and the source for every fact",
      "Four walking routes drawn on the 3D map, with stops, timings and walking minutes",
      "Walk mode at street level with collision against walls and the river",
      "Show-the-driver card with the place name in large Bangla",
      "Time-of-day light from dawn to night, with places that suit the hour",
      "Bangla and English, installs on a phone like an app"
    ],
    tech: ["three.js", "JavaScript", "GLSL", "HTML/CSS", "Netlify"],
    metric: "40 places, 4 routes",
    website: "https://cholopurandhaka.netlify.app/",
    image: "/media/cholo-puran-dhaka-poster.jpg",
    video: media("cholo-puran-dhaka", "Real footage of the site: fly-in, routes, walk mode, night"),
  },
  {
    id: "unun",
    title: "Unun",
    tag: "Full-stack web app, ML services",
    group: "product",
    role: "Designed and built alone",
    description: "A food delivery platform for Dhaka where the price you see is the price you pay, and the arrival time shown is the one you get.",
    longDescription: "Unun (উনুন, the clay stove) covers the whole order: a customer finds a kitchen, orders, pays, follows the rider on a map, rates the food and reports a problem. A restaurant owner, a rider and an admin each have their own workspace. The bag shows the full cost, including delivery, service fee and VAT, from the first item. A small Python service predicts arrival times and makes search work even when dish names are misspelled or typed in Bangla with English letters. The 69 kitchens are invented; the areas, dishes and price levels are real Dhaka, and no real money moves.",
    features: [
      "Customer, restaurant owner, rider and admin workspaces",
      "Full price shown from the first item, nothing added at checkout",
      "Cash, bKash or card through a test payment gateway",
      "Live rider tracking on a map, with the promised arrival window",
      "Arrival-time model and spelling-tolerant search in Python",
      "464 automated tests and 17 short decision records"
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Hono", "PostgreSQL", "Drizzle ORM", "FastAPI", "scikit-learn", "Playwright"],
    metric: "464 automated tests",
    github: "https://github.com/SifatSwapnil2022/Unun",
    website: "https://unun-dhaka.netlify.app/en",
    image: "/media/unun-poster.jpg",
    video: media("unun", "Checkout, tracking and the four workspaces"),
  },
  {
    id: "kona",
    title: "KONA",
    tag: "Accessories brand and online store",
    group: "product",
    role: "Founder, team of five",
    description: "An accessories brand from Dhaka: rings, chains, bracelets and earrings in anti-tarnish steel for men and women, sold through its own store.",
    longDescription: "KONA takes its name from the Bangla word কণা, a speck: the smallest amount of something. Every piece starts from a plain circle with one deliberate change made to it, and most of the collection is unisex. I founded it with a team of five and built the store, which has a shop with filters, product pages with a 3D view, a bag, order tracking, and ordering through Messenger or WhatsApp, in English and Bangla.",
    features: [
      "18 pieces at launch in 316L stainless steel, with Steel, Champagne and Onyx finishes",
      "Shop with filters for category, fit, price, colour, size and stock",
      "Product pages with an interactive 3D view and a size guide",
      "Order by Messenger or WhatsApp with the message pre-filled, plus order tracking",
      "Delivery to every district, 7-day exchange",
      "English and Bangla interface"
    ],
    tech: ["Three.js", "E-commerce", "Oracle Cloud", "English / Bangla"],
    metric: "18 pieces at launch",
    website: "https://konabd.shop/",
    image: "/media/kona-poster.jpg",
    video: media("kona", "The idea behind the brand and the three finishes"),
  },
  {
    id: "medileaf",
    title: "MediLeafNET",
    tag: "Multimodal computer vision",
    group: "research",
    role: "Undergraduate thesis",
    description: "My undergraduate thesis. It identifies medicinal plants from leaf photos by combining an image model with a text model.",
    longDescription: "In traditional medicine, using the wrong plant can cause real harm, so getting the identification right matters. For my thesis, I built a classifier that combines a Vision Transformer for the leaf image with BERT for text, trained on 3,289 leaf photos of 11 species, which we collected at the National Botanic Garden of Bangladesh. When the image model is confident enough, a text model writes a short article on the plant: what it is used for, its active compounds, the evidence, and its side effects. I also built a Gradio web demo and a basic Flutter app to try it out.",
    features: [
      "Combines a Vision Transformer (ViT) for images with BERT for text",
      "Trained and tested on 3,289 leaf photos of 11 species",
      "Writes the article only when the prediction confidence is at least 0.70",
      "Also tested on REMP, a second dataset of 16 rare and endangered species",
      "Web demo built with Gradio",
      "Prototype Flutter app for identifying plants on a phone",
      "Short reference notes on the traditional medicinal use of each species"
    ],
    tech: ["PyTorch", "Python", "Vision Transformer (ViT)", "BERT", "Gradio", "Flutter", "OpenCV"],
    metric: "Identifies the plant, then explains it",
    github: "https://github.com/SifatSwapnil2022/MediLeafNET",
    extraLinks: [{ label: "Thesis reports and slides", href: "https://github.com/SifatSwapnil2022/Capstone-Thesis" }],
    paperLink: "https://data.mendeley.com/datasets/9tdc9gbtgb/2",
    image: "/files/medileafnet.png",
    video: media("medileafnet", "From one leaf photo to an article on the plant"),
  },
  {
    id: "skincare-ai",
    title: "SkinCare AI",
    tag: "Healthcare AI, computer vision",
    group: "research",
    role: "Learning project",
    description: "A project that finds skin lesions in a photo, classifies them, and writes a short plain-language summary of the result.",
    longDescription: "SkinCare AI works in three steps. A YOLOv8 model first finds the lesion in the photo. An ensemble of EfficientNetB0, MobileNetV2, and ResNet50 then classifies it into one of ten categories. Finally, a language model turns the result into a short summary that is easier to read than raw model output. I served it with FastAPI and Streamlit and packaged it with Docker. It is a learning project, not a medical tool.",
    features: [
      "YOLOv8 finds the lesion before it is classified",
      "Classifies skin conditions into 10 categories",
      "Ensemble of three CNNs instead of relying on a single model",
      "A language model writes a plain-language summary of the result",
      "Generates a downloadable PDF report",
      "Served with FastAPI and Streamlit, packaged with Docker"
    ],
    tech: ["Python", "FastAPI", "YOLOv8", "TensorFlow", "MongoDB", "Docker", "Streamlit"],
    metric: "Detect, classify, then explain in plain words",
    github: "https://github.com/SifatSwapnil2022/SkinCareAI",
    image: "/files/skinAI.png",
  },
  {
    id: "bazario",
    title: "Bazario",
    tag: "Multi-vendor marketplace",
    group: "product",
    role: "Not live at the moment",
    description: "A marketplace where each seller runs their own store on a subdomain, with one cart across stores and Stripe Connect paying each seller directly.",
    longDescription: "Bazario lets many sellers run their own shops on one platform. Each seller gets a subdomain and keeps their own products, orders and payouts, separate from everyone else's. Customers browse and filter across all stores, check out once, and Stripe Connect splits the payment between the sellers. Customers, sellers and admins each have their own views, with role-based access. The site isn't live at the moment; the code and the project report are on GitHub.",
    features: [
      "A subdomain and separate data for each seller",
      "Search and filters across all stores: category, price, rating, stock",
      "One cart across stores, paid with Stripe or cash on delivery",
      "Stripe Connect pays each seller directly",
      "Seller dashboard for products, stock and orders",
      "Admin tools for monitoring and moderation"
    ],
    tech: ["Next.js", "React", "Payload CMS", "MongoDB", "Stripe Connect", "Tailwind CSS", "TypeScript"],
    metric: "Separate store per seller",
    github: "https://github.com/SifatSwapnil2022/bazario-A-multi-tenant-Ecommerce-Platform",
    image: "/media/bazario-poster.jpg",
    video: media("bazario", "Demo with sample data: stores, filters, checkout and roles"),
  }
];

/** Order the showreel plays in. */
export const SHOWREEL_IDS = ["defax", "cholo-puran-dhaka", "unun", "kona"];

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-3",
    role: "ML Engineer Intern",
    company: "Syntax Solution Limited",
    location: "Dhaka, Bangladesh",
    period: "Aug 2026 – Present",
    bullets: [
      "Preprocess data, build features, and train and validate ML models in Python on real-world datasets.",
      "Run experiments to compare models before they are used in production."
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
  },
  {
    name: "Strength Training",
    category: "Health",
    description: "I go to the gym regularly for strength training and some cardio. It helps me keep a steady routine alongside work and research.",
  },
  {
    name: "Football",
    category: "Sports",
    description: "I play football with friends whenever I get the chance. It's a good way to get outside and unwind.",
  },
  {
    name: "Photography",
    category: "Creative",
    description: "I like taking photos of nature, landscapes, and everyday moments, mostly to remember places and small details.",
  }
];

export const AWARDS: Award[] = [
  { title: "National Robo-Fest", sub: "3rd Place IT Olympiad, 2024" },
  { title: "Dean's List Scholarship", sub: "East West University, 3 consecutive semesters (2023–2025)" },
  { title: "National ICT Olympiad Bangladesh", sub: "Finalist, 2026" },
  { title: "CodeChef Rating", sub: "2-Star competitive programmer" }
];

export const LANGUAGES: Language[] = [
  { label: "English", level: "C1 / Professional Working" },
  { label: "Bengali", level: "Native / Bilingual" }
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

export const PROFILE = {
  name: "Md Sifatullah Sheikh",
  short: "Sifat",
  email: "mdsifatullahsheikh@gmail.com",
  role: "ML Engineer Intern",
  employer: "Syntax Solution Limited",
  degree: "B.Sc. in Computer Science and Engineering, East West University",
  location: "Dhaka, Bangladesh",
  photo: "/files/profile.png",
  cv: "/files/CV_Sifat_Sheikh.pdf",
};

export const LINKS = [
  { label: "Email", href: "mailto:mdsifatullahsheikh@gmail.com", handle: "mdsifatullahsheikh@gmail.com" },
  { label: "Google Scholar", href: "https://scholar.google.com/citations?view_op=list_works&hl=en&user=7m3g1cEAAAAJ", handle: "Sifatullah Sheikh" },
  { label: "GitHub", href: "https://github.com/SifatSwapnil2022", handle: "SifatSwapnil2022" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mdsifatullahsheikh", handle: "mdsifatullahsheikh" },
];

/** Copied by hand from Google Scholar; not live. */
export const SCHOLAR = { citations: 16, hIndex: 2, i10Index: 0, updated: "September 2026" };

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdaygqjy";

export const RESEARCH_INTERESTS = [
  { title: "Computer vision", desc: "Most of my work so far: detecting fake faces and identifying plants from images." },
  { title: "Machine learning", desc: "Training and testing models, and checking if results hold up on new data." },
  { title: "Robotics and autonomy", desc: "Newer for me. I am interested in models that turn what a robot sees into actions, and in how they fail." },
  { title: "Trustworthy AI", desc: "Models that can show why they made a decision, like the heatmaps in DeFaX." },
  { title: "Human–computer interaction", desc: "AI tools that people can understand and use without guesswork." },
];

export const EDUCATION: EducationItem[] = [
  {
    id: "bsc",
    date: "December 2025",
    credential: "B.Sc. in Computer Science and Engineering",
    institution: "East West University",
    location: "Aftabnagar, Dhaka",
    logo: "/files/east-west-university.png",
    details: "Specialization in Data Science and Intelligent Systems. CGPA 3.70 / 4.00, Dean's List for three consecutive semesters.",
  },
  {
    id: "hsc",
    date: "June 2019",
    credential: "Higher Secondary Certificate (HSC), Science",
    institution: "Birshreshtha Munshi Abdur Rouf Public College",
    location: "Peelkhana, Dhaka",
    logo: "/files/birshreshtha-munshi-abdur-rouf-public-college.png",
  },
  {
    id: "ssc",
    date: "May 2017",
    credential: "Secondary School Certificate (SSC), Science",
    institution: "Narinda Government High School",
    location: "Narinda, Dhaka",
    logo: "/files/narinda-government-high-school.jpeg",
  },
];

export const COURSEWORK = [
  "Data Structures and Algorithms", "Analysis of Algorithms", "Artificial Intelligence", "Machine Learning",
  "Data Mining", "Computer Vision", "Digital Image Processing", "Operating Systems",
  "Database Management Systems", "Internet of Things", "Microprocessors and Microcontrollers",
  "Software Engineering", "Linear Algebra", "Probability and Statistics",
];
