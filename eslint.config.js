import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  unocss: true,
  svelte: true,
  stylistic: {
    indent: 2,
    semi: false,
    quotes: 'single',
  },
  rules: {
    'no-console': 'warn',
  },
})
