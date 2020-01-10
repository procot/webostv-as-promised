import analyze from 'rollup-plugin-analyzer';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    analyze({ summaryOnly: true }),
  ]
};
