const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv);
  config.output.publicPath = "http://localhost:19006/";
  config.resolve.fallback = {
    "fs": false,
    "RNRenderer": false,
    "crypto": false,
    "path": false
  };
  config.output = {
    ...config.output,
    uniqueName: "expo_app",
    publicPath: "auto",
    scriptType: "text/javascript",
  };

  config.plugins.push(
    new ModuleFederationPlugin({
      name: "ExpoMFE",
      filename: "remoteEntry.js",
      remotes: {
        // "ionicComp": "ionicComp@http://localhost:8083/remoteEntry.js",
      },
      exposes: {},
      shared: {
        "react": {
          singleton: true,
          requiredVersion: deps.react,
          eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: true,
        },
        "expo": {
          singleton: true,
          requiredVersion: deps.expo,
          eager: true,
        },
        "react-native": {
          singleton: true,
          requiredVersion: deps["react-native"],
          eager: true,
        },
        "react-native-web": {
          singleton: true,
          requiredVersion: deps["react-native-web"],
          eager: true,
        },
      },
    })
  )
  console.log(312, config);
  return config;
};
