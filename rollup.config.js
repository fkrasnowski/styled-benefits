import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

const plugins = [
  nodeResolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules',
    },
  }),
  babel({
    babelHelpers: 'bundled',
    include: 'src/**',
  }),
  commonjs({
    // exclude: 'src/**',
  }),
]
const external = ['react']
export default {
  input: 'src/index.js',
  external,
  plugins,
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      dir: 'lib',
      format: 'esm',
    },
  ],
}
