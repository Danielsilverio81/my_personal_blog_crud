const path = require('path');

module.exports = {
    mode: 'production',
    entry: './frontend/main.js',
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
           exclude: /node_modules/,
           test: /\.js$/,
           use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/env']
            }
           } 
        },{
            test:/\.css$/,
            use: ['style-loader', 'css-loader']
        } ]
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public'),
          },
        compress: true,
        port: 8081, // Porta para o webpack-dev-server
        hot: true,
        proxy: [
            {
              context: ['/api'],
              target: 'http://localhost:3000',
            },
          ],
      },
};