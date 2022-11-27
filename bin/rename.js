const util = require('util');
const {yamls} = require("./utils");
const exec = util.promisify(require('child_process').exec);

async function rename() {
  const {stdout, stderr} = await exec(
    `npx react-native-rename ${yamls.app.name} -b ${yamls.app.apk}`,
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

module.exports = rename;
