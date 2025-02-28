import { defineConfig } from 'eslint-define-config';
import nextPlugin from '@next/eslint-plugin-next';

export default defineConfig({
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    // Your rules here
  },
});