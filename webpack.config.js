const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const devServer = {
   contentBase: path.join(__dirname, '/public'),
   port: 3000,
   inline: true,
   hot: true,
   host: 'localhost',
   stats: {
      colors: true,
      errors: true,
      warnings: true,
      modules: true,
      chunks: true,
      assets: true,
      hash: true
   },
}

module.exports = env => {
   const sourceMap = env.prod ? 'source-map' : 'eval'
   
   let plugins = [
      new HtmlWebpackPlugin({
         inject: true,
         template: path.join(__dirname, 'public', 'index.html')
      })
   ]
   
   if (env.prod) {
      plugins.push(
         new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
         }),
         new webpack.DefinePlugin({
            'process.env': {
               'NODE_ENV': JSON.stringify('production')
            }
         })
      )
   }

   if (env.dev) {
      plugins.push(
         new webpack.HotModuleReplacementPlugin()
      )
   }

   const output = env.prod 
      ? {
         filename: 'bundle.js',
         path: path.join(__dirname, 'dist'),
         publicPath: '/'
      } : {
         path: path.join(__dirname, 'dist'),
         pathinfo: true,
         filename: 'static/js/bundle.js',
         chunkFilename: 'static/js/[name].chunk.js',
         publicPath: '/'
      }

   let config = {
      entry: process.env.ENTRY,
      output,
      devtool: sourceMap,
      module: {
         rules: [
            {
               test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
               loader: require.resolve('url-loader'),
               options: {
                 limit: 10000,
                 name: 'static/media/[name].[hash:8].[ext]',
               },
            },
            {
               test: /\.jsx?$/,
               exclude: /node-modules/,
               use: [{
                  loader: 'babel-loader',
               }],
               include: path.join(__dirname, '/'),
            },
            {
               test: /\.(css|scss|sass)$/,
               include: path.join(__dirname, '/'),
               use: [
                  'style-loader',
                  {
                     loader: 'css-loader',
                     options: {
                        sourceMap,
                        importLoaders: 1,
                        // modules: true // breaks highlight.js theme style import
                     }
                  },
                  {
                     loader: 'sass-loader',
                     options: {
                        sourceMap,
                     }
                  },
                  'postcss-loader'
               ]
            },
         ]
      },
      plugins
   }

   if (env.dev) {
      config['devServer'] = devServer
   }

   return config
}