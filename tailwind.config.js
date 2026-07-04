import daisyui from 'daisyui';
import CONFIG from './gitprofile.config';

/** @type {import('tailwindcss').Config} */
export default {
  plugins: [daisyui],
  daisyui: {
    logs: false,
    themes: CONFIG.themeConfig.themes,
  },
};
