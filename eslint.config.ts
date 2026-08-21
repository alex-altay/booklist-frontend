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
      '@/no-console': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@/eqeqeq': 'error',
      '@/prefer-const': 'error',
      '@/no-duplicate-imports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      'vue/eqeqeq': 'error',
      'vue/no-console': 'error',
      'vue/object-shorthand': 'error',
      'vue/prefer-template': 'error',
      'vue/no-undef-properties': 'error',
      'vue/no-loss-of-precision': 'error',
      'vue/no-useless-concat': 'error',
      'vue/multi-word-component-names': 'warn',
    },
  },
  {
    files: ['**/*.{js,ts,vue}'],
    extends: [eslintConfigPrettier],
  },
])
