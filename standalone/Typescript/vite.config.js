// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        // Set a fixed name for the entry file
        //entryFileNames: `[name].js`, 
        // Set a fixed name for other chunks
        //chunkFileNames: `chunk-[name].js`,
        // Also useful for controlling asset names (like CSS, images)
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  }
});
