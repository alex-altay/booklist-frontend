import eslintConfigPrettier from 'eslint-config-prettier'
import pluginVue from 'eslint-plugin-vue'
import tseslint from '@typescript-eslint/eslint-plugin'
import vueParser from 'vue-eslint-parser'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  ...pluginVue.configs['flat/recommended'],
  globalIgnores(['src/components/ui/**']),
  {
    files: ['**/*.{ts,vue}'],
    plugins: { '@typescript-eslint': tseslint },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: ['.vue'],
        ecmaVersion: 2022,
        sourceType: 'module',
        EXPERIMENTAL_useProjectService: true,
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@/no-console': 'error',
      'vue/multi-word-component-names': 'warn',
    },
  },
  {
    files: ['**/*.{js,ts,vue}'],
    extends: [eslintConfigPrettier],
  },
])
