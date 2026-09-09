// gitprofile.config.ts

const CONFIG = {
  github: {
    username: 'JuanjoLopez19', // Your GitHub org/user name. (This is the only required config)
  },
  /**
   * If you are deploying to https://<USERNAME>.github.io/, for example your repository is at https://github.com/arifszn/arifszn.github.io, set base to '/'.
   * If you are deploying to https://<USERNAME>.github.io/<REPO_NAME>/,
   * for example your repository is at https://github.com/arifszn/portfolio, then set base to '/portfolio/'.
   */
  base: '/',
  projects: {
    github: {
      display: true,
      header: 'Github Projects',
      mode: 'manual',
      automatic: {
        sortBy: 'stars',
        limit: 8,
        exclude: {
          forks: true,
          projects: ['JuanjoLopez19/assets'],
        },
      },
      manual: {
        projects: [
          'JuanjoLopez19/AutomatAPI',
          'JuanjoLopez19/url-shortener-fastapi'
        ],
      },
    },
    external: {
      header: 'Personal Projects',
      projects: [
        {
          title: 'MercaSaver',
          description:
            'Built a web app that turns different supermarket receipts into clear spending insights, helping users track purchases and find ways to save.',
          imageUrl: 'https://mercasaver.jjlopez.dev/favicon.svg',
          link: 'https://mercasaver.jjlopez.dev',
        },
        {
          title: 'Job-Offer-Mcp',
          description:
            'Helpful tool that contains a Job Offer Scraper via MCP, that extracts de offer info, and two complementary skills one for the adapt of your cv to the offer and another to make a cover letter for the offer that has been given',
          imageUrl: '',
          link: 'https://job-scraper-mcp.jjlopez.dev',
        },
        {
          title: 'Job-Talk',
          description:
            'WebSite that will be helpful to prepare Job Interviews with a NearReal Time conversation with TTS and STT with local models',
          imageUrl: '',
          link: 'https://job-talk.jjlopez.dev',
        },
        {
          title: 'FastCutPy',
          description: 'Cloud URL Shortener',
          imageUrl: 'https://fastcutpy.vercel.app/static/logo.webp',
          link: 'https://fastcutpy.vercel.app/',
        }
      ],
    },
  },
  seo: {
    title: 'Juanjo López | Senior AI & Backend Developer',
    description: 'Senior AI & Backend Developer | Emergya',
    imageURL: 'https://avatars.githubusercontent.com/u/92031193?v=4',
  },
  social: {
    linkedin: 'juanjolopezgomez',
    phone: '',
    email: 'contact@jjlopez.dev',
    stackoverflow: '24182064',
    medium: 'juanjolopez19',
  },
  resume: {
    fileUrl:
      'https://github.com/JuanjoLopez19/assets/raw/refs/heads/main/CV_English.pdf',
  },
  skills: {
    Backend: [
      'FastAPI',
      'Flask',
      'ExpressJs',
      'NestJS',
      'ORM (Prisma, Sequelize, SQLAlchemy)',
    ],
    Databases: ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB', 'Elasticsearch'],
    AI: ['LangChain', 'LangGraph', 'RAG (GCP Datastores)', 'Langfuse'],
    DevOps: ['Docker', 'AWS', 'GCP', 'Github Actions', 'Jenkins'],
  },
  experiences: [
    {
      company: 'Emergya',
      position: 'Senior AI & Backend Developer',
      from: 'September 2025',
      to: 'Present',
      companyLink: 'https://www.emergya.com/es',
    },
    {
      company: 'BISITE Research Group',
      position: 'Backend Developer',
      from: 'May 2023',
      to: 'September 2025',
      companyLink: 'https://bisite.usal.es/',
    },
    {
      company: 'BISITE Research Group',
      position: 'Full Stack Developer',
      from: 'March 2022',
      to: 'April 2023',
      companyLink: 'https://bisite.usal.es/',
    },
    {
      company: 'BISITE Research Group',
      position: 'Intern',
      from: 'October 2021',
      to: 'February 2022',
      companyLink: 'https://bisite.usal.es/',
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect - Associate',
      year: '2026',
      link: 'https://www.credly.com/badges/dad42bfc-736e-4899-bd10-f9589e2c1bd1',
    },
    {
      name: 'AWS Certified Developer - Associate',
      year: '2026',
      link: 'https://www.credly.com/badges/2e82261f-0d80-4522-9061-64a47b21d08d',
    },
  ],
  educations: [
    {
      institution: 'Salamanca University',
      degree: 'Intelligent Systems Master',
      from: '2023',
      to: '2024',
    },
    {
      institution: 'Salamanca University',
      degree: 'Computer Engineering Degree',
      from: '2019',
      to: '2023',
    },
  ],
  themeConfig: {
    defaultTheme: 'dark',
    disableSwitch: false,
    respectPrefersColorScheme: true,
    themes: ['light', 'dark'],
  },
  enablePWA: true,
};

export default CONFIG;
