const path = require("path");
const autoprefixer = require('autoprefixer');
module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["babel-plugin-transform-class-properties"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
      },
      {
          loader: 'css-loader',
          options: {
              sourceMap: true
          }
      }, 
        {
          loader: 'postcss-loader',
          options: {
              plugins: [
                  autoprefixer({
                      browsers:['ie >= 8', 'last 4 version']
                  })
              ],
              sourceMap: true
          }
        },
          {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  },
  mode: "development"
};
