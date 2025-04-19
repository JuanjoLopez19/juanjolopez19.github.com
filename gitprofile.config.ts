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
          'JuanjoLopez19/GungeonFinder',
          'JuanjoLopez19/Goose',
          'JuanjoLopez19/url-shortener-fastapi',
        ], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'Personal Projects',
      projects: [
        {
          title: 'MercaSaver',
          description:
            'Built a tool that track the expenses from the supermarket brand ”Mercadona”',
          imageUrl: 'https://merca-saver.vercel.app/static/assets/logo.webp',
          link: 'https://merca-saver.vercel.app',
        },
        {
          title: 'FastCutPy',
          description:
            'Built serverless url shortener with FastAPI and MongoDB',
          imageUrl: 'https://fastcutpy.vercel.app/static/logo.webp',
          link: 'https://fastcutpy.vercel.app/',
        },
      ],
    },
  },
  seo: {
    title: 'Juanjo López | Software Engineer',
    description: 'Backend Developer | BISITE Research Group',
    imageURL: 'https://avatars.githubusercontent.com/u/92031193?v=4',
  },
  social: {
    linkedin: 'juanjolopezgomez',
    phone: '',
    email: 'juanjo.lopez.gomez.19@gmail.com',
    stackoverflow: '24182064',
    medium: 'juanjolopez19',
  },
  resume: {
    fileUrl:
      'https://github.com/JuanjoLopez19/assets/raw/refs/heads/main/CV_English.pdf', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Python',
    'Selenium',
    'Flask',
    'Django',
    'ExpressJs',
    'VueJS',
    'Angular',
    'MongoDB',
    'PostgreSQL',
    'Redis',
    'Prisma',
    'Sequelize',
    'Docker',
    'AWS',
  ],
  experiences: [
    {
      company: 'BISITE Research Group',
      position: 'Backend Developer',
      from: 'May 2023',
      to: 'Present',
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
  certifications: [],
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
  publications: [],
  // Display articles from your medium or dev account. (Optional)
  blog: {
    source: 'medium',
    username: 'juanjolopez19',
    limit: 3,
  },
  googleAnalytics: {
    id: 'G-TM0MG46RQD', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'emerald',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: true,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: true,

    // Display the ring in Profile picture
    displayAvatarRing: true,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'emerald',
      'corporate',
      'halloween',
      'forest',
      'aqua',
      'lofi',
      'business',
    ],

    // Custom theme, applied to `procyon` theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },

  // Optional Footer. Supports plain text or HTML.
  footer: `Made with <a 
      class="text-primary" href="https://github.com/arifszn/gitprofile"
      target="_blank"
      rel="noreferrer"
    >GitProfile</a> and ❤️`,

  enablePWA: true,
};

export default CONFIG;
