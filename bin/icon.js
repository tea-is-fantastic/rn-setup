const util = require('util');
const fs = require("fs/promises");
const path = require("path");
const {src} = require("./utils");
const exec = util.promisify(require('child_process').exec);

const pth = path.join(src, 'app.json')

async function icon() {
  const file = await fs.readFile(pth, 'utf-8');
  const json = JSON.parse(file);
  json.svgAppIcon = {
    "foregroundPath": "./assets/svg/icon.svg"
  };

  await fs.writeFile(pth, JSON.stringify(json, null, 2));

  const {stdout, stderr} = await exec('npx react-native-svg-app-icon');
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

module.exports = icon;
