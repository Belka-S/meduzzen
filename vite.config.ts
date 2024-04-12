import fs from 'fs';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

const arrDirent: fs.Dirent[] = fs.readdirSync('./src', {
  withFileTypes: true,
});

const dirNames: string[] = arrDirent
  .filter(el => el.isDirectory())
  .map(el => el.name);

const dirPaths = dirNames.reduce((acc, dir) => {
  const path = { [dir]: `/${dir === 'src' ? dir : 'src/' + dir}` };
  return { ...acc, ...path };
}, {});

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { ...dirPaths },
  },
  server: {
    watch: { usePolling: true },
    host: true,
    strictPort: true,
    port: 3000,
    open: '/',
  },
  base: '/react-meduzzen',
});
