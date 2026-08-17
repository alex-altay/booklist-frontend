import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

const ENV_ERRORS = {
  HOST_IS_NOT_SET: 'VITE_HOST is not set. Add it to .env or to the deploy environment. Mode: ',
  HOST_IS_NOT_URL: 'VITE_HOST must be an absolute URL with a scheme, got: ',
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  if (!env.VITE_HOST) {
    throw new Error(`${ENV_ERRORS.HOST_IS_NOT_SET} ${mode}`)
  }

  try {
    new URL(env.VITE_HOST)
  } catch {
    throw new Error(`${ENV_ERRORS.HOST_IS_NOT_URL} ${env.VITE_HOST}`)
  }

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@api': path.resolve(__dirname, './api'),
      },
    },
  }
})
