import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5173,
    watch: {
      // Prevent Vite from triggering full page reloads when JSON Server modifies db.json
      ignored: ['**/db.json', '**/db.json/**']
    }
  }
});
