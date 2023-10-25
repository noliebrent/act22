const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig();

  return {
    transformer: {
      ...defaultConfig.transformer,
      assetPlugins: ["react-native-reanimated/plugin"],
    },
  };
})();