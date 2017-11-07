import path from 'path'

import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import url from 'rollup-plugin-url'
import copy from 'rollup-plugin-copy'
import filesize from 'rollup-plugin-filesize'

// devserver requirements
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import html from 'rollup-plugin-fill-html'

// postcss plugins that we use for the component library
import postcss from 'rollup-plugin-postcss'
import postcssModules from 'postcss-modules'
import cssnext from 'postcss-cssnext'
import precss from 'precss'
import cssnano from 'cssnano'
import nested from 'postcss-nested'


// Convert CJS modules to ES6, so they can be included in a bundle
import commonjs from 'rollup-plugin-commonjs'

const isProd = process.env.NODE_ENV === 'production'

const cssExportMap = {}
const NODE_MODULES_EXCLUDE = 'node_modules/**'

const output_dir = path.resolve(__dirname, 'build')

import pkg from './package.json'
const external = Object.keys(pkg.dependencies)

let postCssPlugins = [
   cssnext({ warnForDuplicates: false }),
   precss(),
   nested(),
   postcssModules({
      getJSON(id, exportTokens) {
         cssExportMap[id] = exportTokens;
      }
   })
]

let rollupPlugins = [

   // Define environment variables in the library
   replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
   }),

   resolve({
      customResolveOptions: {
         moduleDirectory: 'node_modules'
      },
      jsnext: true,
      main: true,
      browser: true,
   }),

   // postcss for styles using numerous plugins for sass like syntax
   postcss({
      sourcemap: true,
      plugins: isProd ? [...postCssPlugins, cssnano()] : postCssPlugins,
      getExportNamed: false,
      getExport (id) {
         return cssExportMap[id];
      },
      extract: path.resolve(output_dir, 'main.css'),
   }),

   commonjs({
      include: 'node_modules/**',
      namedExports: {
         'node_modules/react/index.js': ['PropTypes', 'createElement', 'Component', 'PureComponent', 'cloneElement', 'Children']
      },
   }),
   
   // Allow transpilation of future JS
   babel({
      exclude: NODE_MODULES_EXCLUDE,
      plugins: ['external-helpers']
   }),

   // limit imports or url() in project
   url({ limit: 1000000 }),

   // show the output bundle size in the CLI
   filesize()
]

if (isProd) {
   rollupPlugins = [...rollupPlugins, uglify()]
} else {
   rollupPlugins = [
      ...rollupPlugins, 
      copy({
         'public/index.html': 'build/index.html',
         'node_modules/highlight.js/styles/atom-one-dark.css': 'build/atom-one-dark.css',
         verbose: true
      }),

      html({
         template: 'build/index.html',
         filename: 'index.html',
         externals: [
            { type: 'css', file: 'main.css', inject: 'head' },
            { type: 'css', file: 'atom-one-dark.css', inject: 'head' },
            { type: 'js', file: 'index.js', inject: 'body' }
         ]
      }),

      // devserver instantiation
      serve({
         contentBase: output_dir,
         historyApiFallback: false,
      }),

      livereload({ watch: output_dir }),      
   ]
}

export default {
   input: isProd ? path.resolve(__dirname, 'lib', 'index.js') : path.resolve(__dirname, 'lib', 'app.js'),
   output: {
      file: path.resolve(output_dir, 'index.js'),
      format: 'cjs',
      name: 'glomo-boxes',
      sourcemap: true,
      sourcemapFile: output_dir
   },
   plugins: rollupPlugins,

   // external dependencies of the project
   external: (isProd && external)
}