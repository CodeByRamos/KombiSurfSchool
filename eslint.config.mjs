import coreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/** Flat config do ESLint 9 usando os presets do Next 16. */
const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', 'test-results/**', 'playwright-report/**', 'next-env.d.ts'],
  },
  ...coreWebVitals,
  ...nextTypescript,
];

export default eslintConfig;
