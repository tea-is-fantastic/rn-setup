const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {regRep, androidSrc} = require('./utils');
const path = require('path');

const [apk] = process.argv.slice(3);

const pth = path.join(androidSrc, 'java', ...apk.split('.'));

async function fileChanges() {
  await regRep(
    path.join(pth, 'MainActivity.java'),
    /(^public class MainActivity.*$)/m,
    'import android.os.Bundle;\n\n$1',
    'android.os.Bundle',
  );

  const code = `
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }`;

  await regRep(
    path.join(pth, 'MainActivity.java'),
    /(^public class MainActivity.*$)/m,
    `$1\n${code}`,
    'void onCreate',
  );
}

async function navigation() {
  const {stdout, stderr} = await exec(
    'yarn add react-navigation react-native-screens react-native-safe-area-context',
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  await fileChanges();
}

module.exports = navigation;
