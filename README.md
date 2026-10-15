<div align="center">

# Md Sifatullah Sheikh

### Research portfolio

Computer Vision · Machine Learning · Robotics · Trustworthy AI · Human-Computer Interaction

[![Live site](https://img.shields.io/badge/Live%20site-mywebsite--j7mf.onrender.com-E5533D)](https://mywebsite-j7mf.onrender.com/#/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Live site](https://mywebsite-j7mf.onrender.com/#/) · [CV](public/files/CV_Sifat_Sheikh.pdf) · [Google Scholar](https://scholar.google.com/citations?view_op=list_works&hl=en&user=7m3g1cEAAAAJ) · [LinkedIn](https://www.linkedin.com/in/mdsifatullahsheikh) · [Email](mailto:mdsifatullahsheikh@gmail.com)

</div>

---

This is the source code for my personal academic website. I built it to present my research, publications and projects to PhD admissions committees, prospective advisers and collaborators.

I am a Computer Science and Engineering graduate of East West University, Dhaka. My published work so far is on deepfake detection and explainable AI, and on a medicinal plant image dataset collected in Bangladesh.

## Publications

- **DeFaX: A Cross-Attention Fusion Framework for Robust and Explainable Deepfake Detection**<br>
  Md Al-Imran, **Md Sifatullah Sheikh**, Urmi Kirtonia, Nuzath Tabassum Arthi, Shamim Ripon<br>
  *IEEE Access*, 2025 · [Paper](https://ieeexplore.ieee.org/abstract/document/11303744) · [Code](https://github.com/SifatSwapnil2022/Journal_DefaX_codes)

- **AI-Powered Deepfake Detection Using CNN and Vision Transformer Architectures**<br>
  **Md Sifatullah Sheikh**, Urmi Kirtonia, Nuzath Tabassum Arthi, Md Al-Imran<br>
  *IEEE IBDAP*, 2025 · [Paper](https://ieeexplore.ieee.org/abstract/document/11145852) · [Code](https://github.com/SifatSwapnil2022/conf_AI-Powered_Deepfake_Detection_codes)

- **Medicinal Plant Leaf Image Dataset of 13 Species Collected in Bangladesh**<br>
  Momena Khatun Zinia, Mahmudul Haque Sakib, **Md Sifatullah Sheikh**, Urmi Kirtonia, Bashirul Islam, Md Nawab Yousuf Ali<br>
  Data paper under review at *Scientific Data* · [Dataset on Mendeley Data](https://data.mendeley.com/datasets/9tdc9gbtgb/2)

## What is on the site

| Page | Route | Contents |
|---|---|---|
| Home | `#/` | Introduction, a featured project film, research interests, publications, selected projects and recent updates |
| About | `#/about` | Background, education, skills, awards, languages and activities |
| Experience | `#/experience` | Timeline of research and industry roles |
| Research | `#/research` | Publications, with search, a filter by type (journal, conference, dataset) and citation copy |
| Projects | `#/projects` | An index of all projects, the featured project film, research projects in detail, and a grid of things I built |
| News | `#/news` | Dated updates with search |
| Contact | `#/contact` | Contact form and links |

## Tech stack

| Layer | Choice |
|---|---|
| UI | [React 19](https://react.dev/) with [TypeScript 5.8](https://www.typescriptlang.org/) |
| Build | [Vite 6](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) through `@tailwindcss/vite` |
| Animation | [Motion](https://motion.dev/) |
| Icons | [Lucide](https://lucide.dev/) |
| Routing | Hash-based routing written in `src/App.tsx`, with no router library |
| Contact form | [Formspree](https://formspree.io/) |
| Hosting | [Render](https://render.com/) |

## Run locally

Requires [Node.js](https://nodejs.org/) 20 or 22.

```bash
git clone https://github.com/SifatSwapnil2022/myWebsite.git
cd myWebsite
npm install
npm run dev
```

The site is then available at `http://localhost:3000`. No environment variables are needed.

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server on port 3000 |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Type-checks the project with `tsc --noEmit` |

## Project structure

```
myWebsite/
├── index.html
├── public/
│   ├── files/                # CV, profile photo, logos and project images
│   ├── media/                # project films (720p and 1080p) and their posters
│   └── play/dhaka-bus-war/   # playable build of Dhaka Bus War (copied from its own repo)
├── src/
│   ├── main.tsx              # entry point
│   ├── App.tsx               # layout and hash routing
│   ├── index.css             # Tailwind import and theme tokens
│   ├── types.ts              # types for publications, projects, experience, news
│   ├── data/
│   │   └── portfolioData.ts  # all site content
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── FeaturedFilm.tsx  # the large film at the top of Home and Projects
│   │   ├── ProjectMedia.tsx
│   │   ├── ProjectRow.tsx
│   │   └── ProjectModal.tsx
│   └── pages/
│       ├── Home.tsx
│       ├── About.tsx
│       ├── Experience.tsx
│       ├── Research.tsx
│       ├── Projects.tsx
│       ├── News.tsx
│       └── Contact.tsx
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Updating content

Almost all text on the site comes from one file, [`src/data/portfolioData.ts`](src/data/portfolioData.ts). The shape of each entry is defined in [`src/types.ts`](src/types.ts).

| To change | Edit |
|---|---|
| Publications | `PUBLICATIONS` |
| Projects | `PROJECTS` |
| Featured project | `FEATURED_ID` (any project with a `video`) |
| Work and research roles | `EXPERIENCES` |
| News items | `NEWS` |
| Awards, skills, languages, activities | `AWARDS`, `SKILL_GROUPS`, `LANGUAGES`, `EXTRA_ACTIVITIES` |
| CV | Replace `public/files/CV_Sifat_Sheikh.pdf`, keeping the same file name |
| Images | Add the file to `public/files/` and reference it as `/files/your-image.png` |
| Dhaka Bus War build | Run `python3 build.py` in the game repo and copy its `index.html` to `public/play/dhaka-bus-war/` |

The contact form posts to Formspree. To send messages to a different inbox, change `FORMSPREE_ENDPOINT` in [`src/pages/Contact.tsx`](src/pages/Contact.tsx).

## Deployment

The site builds to static files, so any static host works. On Render, create a Static Site with:

| Setting | Value |
|---|---|
| Build command | `npm install && npm run build` |
| Publish directory | `dist` |

Because routing uses the URL hash, no rewrite rules are needed.

## Contact

I am applying to PhD programs for Fall 2027 and am glad to hear from prospective advisers and collaborators.

- Email: [mdsifatullahsheikh@gmail.com](mailto:mdsifatullahsheikh@gmail.com)
- LinkedIn: [mdsifatullahsheikh](https://www.linkedin.com/in/mdsifatullahsheikh)
- GitHub: [SifatSwapnil2022](https://github.com/SifatSwapnil2022)
- Google Scholar: [Sifatullah Sheikh](https://scholar.google.com/citations?view_op=list_works&hl=en&user=7m3g1cEAAAAJ)
