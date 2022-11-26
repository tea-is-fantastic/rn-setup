const util = require('util');
const exec = util.promisify(require('child_process').exec);

const [name, bundle] = process.argv.slice(2);

async function rename() {
  const {stdout, stderr} = await exec(
    `npx react-native-rename ${name} -b ${bundle}`,
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}

module.exports = rename;
