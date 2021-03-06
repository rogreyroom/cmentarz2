module.exports = {
  root: true,

  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },

  env: {
    browser: true
  },

  extends: [
    // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    // 'plugin:vue/essential',
    'eslint:recommended',
    'plugin:vue/recommended',
    // '@vue/prettier'  - wyłączyłem ręcznie
  ],

  // required to lint *.vue files
  plugins: [
    'vue'
  ],

  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true,
    'process': true,
    'Capacitor': true,
    'chrome': true
  },

  // add your custom rules here
  rules: {
    // 'prefer-promise-reject-errors': 'off',
    // 'prettier/prettier': ['warn', {
    //   'htmlWhitespaceSensitivity': 'ignore',
    //   'parse': 'vue',
    //   'vueIndentScriptAndStyle': true
    // }],
    // 'fix': true,
    // "vue/max-attributes-per-line": ["warn", {
    // "singleline": 1,
    // "multiline": {
    //   "max": 1,
    //   "allowFirstLine": true
    // }
  // }],
    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
