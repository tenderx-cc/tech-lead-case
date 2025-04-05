import react from '@vitejs/plugin-react-swc';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

const htmlInjectPlugin = (): Plugin => {
  return {
    name: 'head-html-inject-plugin',
    transformIndexHtml: {
      transform(html) {
        let favIcon = '';
        if (process.env.NODE_ENV === 'production') {
          favIcon = `<link rel="icon" type="img/png" href="/favicon.ico" />`;
        } else {
          favIcon = `<link rel="icon" type="img/png" href="/favicon-dev.ico" />`;
        }
        return html.replace('</head>', `${favIcon}</head>`);
      },
    },
  };
};

export default defineConfig({
  build: {
    sourcemap: true,
  },
  plugins: [
    svgr(),
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
    htmlInjectPlugin(),
  ],
});
