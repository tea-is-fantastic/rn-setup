const util = require('util');
const {regRep, androidPath, androidSrc} = require("./utils");
const path = require("path");
const fs = require("fs/promises");
const exec = util.promisify(require('child_process').exec);

async function fileChanges() {
  await regRep(
      path.join(androidPath, 'app', 'build.gradle'),
      /^(\s+)(implementation.*swiperefresh.*\"\n)$/m,
      '$1$2$1implementation "com.facebook.soloader:soloader:0.9.0+"\n',
      'soloader',
  );
  // await fs.writeFile(
  //     path.join(androidPath, 'local.properties'),
  //     `sdk.dir=${process.env.ANDROID_HOME}`
  // );
}

async function start() {
  const {stdout, stderr} = await exec(
      `git init .`,
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  await fileChanges();
}

module.exports = start;
