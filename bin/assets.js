const util = require('util');
const fs = require("fs/promises");
const {src} = require("./utils");
const path = require("path");
const exec = util.promisify(require('child_process').exec);

async function assets() {
  await fs.writeFile(path.join(src, 'react-native.config.js'), `
  module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
};
`)
  const {stdout, stderr} = await exec(
      `npx react-native-asset`,
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

module.exports = assets;
