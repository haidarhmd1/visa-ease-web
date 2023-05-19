// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const blacklist = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

config.transformer = {
  getTransformOptions: () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: false,
    },
  }),
};

config.resolver = {
  assetExts: ['bin', 'txt', 'jpg', 'ttf', 'png'],
  sourceExts: ['js', 'json', 'ts', 'tsx', 'jsx'],
  blacklistRE: blacklist([/platform_node/]),
};

module.exports = config;
