const webpack = require('webpack')
const path = require('path')

module.exports = env => {
   return {
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
      },
      module: {
         rules: [
            {
               test: /\.jsx?$/,
               exclude: /(node_modules|bower_components|build)/,
               use: [{
                  loader: 'babel-loader',
                  options: {
                    presets: ['env']
                  }
               }],
               include: path.resolve(__dirname, 'src'),
            },
         ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      },
      externals: {
        'react': 'commonjs react', // This line is to use React dependency of the parent project
        'react-dom': 'commonjs react-dom'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
      ]
  }
}