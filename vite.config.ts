import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "url";

// alias path 를 만들어주는 콜백함수
const getAliasPath = (path: string | { toString: () => string; }) => {
  return fileURLToPath(new URL(path, import.meta.url));
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": getAliasPath("./src"),
      "@assets": getAliasPath("./src/assets"),
      "@hooks": getAliasPath("./src/hooks"),
      "@styles": getAliasPath("./src/styles"),
      "@utils": getAliasPath("./src/utils"),
      "@pages": getAliasPath("./src/pages"),
      "@stores": getAliasPath("./src/stores"),
      "@components": getAliasPath("./src/components"),
    },
  },
})
