import analyze from 'rollup-plugin-analyzer';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'index.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    analyze({ summaryOnly: true }),
  ]
};
