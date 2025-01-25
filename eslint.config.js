import globals from "globals";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // Desactivar 'react/react-in-jsx-scope'
      'react/react-in-jsx-scope': 'off',

      // Desactivar 'react/prop-types'
      'react/prop-types': 'off',
    },
  },
  
];