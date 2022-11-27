const util = require('util');
const {regRep, androidPath, dataPath, yamls, src} = require("./utils");
const path = require("path");
const exec = util.promisify(require('child_process').exec);

async function fileChanges() {
  await regRep(
      path.join(androidPath, 'app', 'build.gradle'),
      /^(\s+)(implementation.*swiperefresh.*\"\n)$/m,
      '$1$2$1implementation "com.facebook.soloader:soloader:0.9.0+"\n',
      'soloader',
  );
}

async function init() {
  const name = yamls.app.name
  const {stdout, stderr} = await exec(
      `npx react-native init ${name} --template react-native-template-typescript`,
  );
  await exec(
      `mv ./${name}/* . && rm -rf ./${name}`,
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

async function start() {
  await init();
  const {stdout, stderr} = await exec(
      `git init .`,
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  await fileChanges();
}

module.exports = start;
