const withFonts = require('next-fonts');
module.exports = withFonts({
  webpack(config, options) {
    console.log(config)
    return config;
  }
});