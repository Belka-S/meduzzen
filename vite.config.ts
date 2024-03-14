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
  server: { open: '/', port: 3000 },
  base: '/mern-tstarter',
});
