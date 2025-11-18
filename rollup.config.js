
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/nick-light-card.js',
  output: {
    file: 'dist/nick-light-card.js',
    format: 'es'
  },
  plugins: [resolve(), commonjs()]
};
