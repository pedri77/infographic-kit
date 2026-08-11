import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'InfographicKit',
      formats: ['es', 'umd'],
      fileName: (format) => `infographic-kit.${format}.js`,
    },
    rollupOptions: {
      external: ['@antv/infographic'],
      output: {
        globals: {
          '@antv/infographic': 'AntVInfographic',
        },
      },
    },
    sourcemap: true,
    outDir: 'dist',
  },
});
