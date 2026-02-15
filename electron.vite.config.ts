import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';

import { resolve } from 'path';

export default defineConfig({
  main: {
    resolve: {
      alias: {
        "@/lib": resolve('src/renderer/src/lib'),
        "@shared": resolve('src/shared')
      }
    }
  },
  preload: {},
  renderer: {
    assetsInclude: "src/renderer/assets/**",
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        "@shared": resolve('src/shared'),
        "@/hooks": resolve('src/renderer/src/hooks'),
        "@/components": resolve('src/renderer/src/components'),
        "@/modules": resolve('src/renderer/src/modules'),
        "@/stores": resolve('src/renderer/src/stores'),

      }
    },
    plugins: [ react(), tailwindcss(), ]
  }
});
