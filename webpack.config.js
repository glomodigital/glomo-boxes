const webpack = require('webpack')
const path = require('path')

module.exports = env => {
  console.log(env.dev)
   return {
      entry: './lib/index.js',
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
               include: path.resolve(__dirname, 'lib'),
            },
            {
              test: /\.(css|scss|sass)$/,
              include: path.resolve(__dirname, 'lib'),
              use: [
                 'style-loader',
                 {
                    loader: 'css-loader',
                    options: {
                       sourceMap: env.dev,
                       importLoaders: 1,
                       modules: true,
                       localIdentName: '[path][name]__[local]___[hash:base64:5]'
                    }
                 },
                 {
                    loader: 'sass-loader',
                    options: {
                       sourceMap: env.dev,
                    }
                 },
                 'postcss-loader'
              ]
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