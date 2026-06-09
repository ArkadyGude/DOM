const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  optimization: {
    minimizer: [
      // Минификация JS
      new TerserPlugin({
        terserOptions: {
          compress: { drop_console: true },
        },
      }),
      // Минификация CSS
      new CssMinimizerPlugin(),
    ],
    minimize: true,
  },

  // Плагины из common уже есть, можно добавить дополнительные, если нужно
  plugins: [
    // Здесь можно оставить пустым или добавить что-то специфичное для production
  ],
});
