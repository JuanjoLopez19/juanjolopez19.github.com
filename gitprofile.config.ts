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
      display: true, // Display GitHub projects?
      header: 'Github Projects',
      mode: 'manual', // Mode can be: 'automatic' or 'manual'
      automatic: {
        sortBy: 'stars', // Sort projects by 'stars' or 'updated'
        limit: 8, // How many projects to display.
        exclude: {
          forks: true, // Forked projects will not be displayed if set to true.
          projects: ['JuanjoLopez19/assets'], // These projects will not be displayed. example: ['arifszn/my-project1', 'arifszn/my-project2']
        },
      },
      manual: {
        projects: ['JuanjoLopez19/AutomatAPI', 'JuanjoLopez19/GungeonFinder', 'JuanjoLopez19/Goose'], // List of repository names to display. example: ['arifszn/my-project1', 'arifszn/my-project2']
      },
    },
    external: {
      header: 'My Projects',
      // To hide the `External Projects` section, keep it empty.
      projects: [],
    },
  },
  seo: {
    title: 'Juanjo López | Software Engineer',
    description:
      'Software Engineer | Full Stack Developer | BISITE Research Group',
    imageURL: 'https://avatars.githubusercontent.com/u/92031193?v=4',
  },
  social: {
    linkedin: 'juanjolopezgomez',
    phone: '',
    email: 'juanjoselopez@usal.es',
    stackoverflow: '24182064',
    medium: 'juanjolopez19',
  },
  resume: {
    fileUrl:
      'https://github.com/JuanjoLopez19/assets/raw/refs/heads/main/CV%20English.pdf', // Empty fileUrl will hide the `Download Resume` button.
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
    'Codeigniter',
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
      position: 'Full Stack Developer',
      from: 'March 2022',
      to: 'Present',
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
    disableSwitch: false,

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
