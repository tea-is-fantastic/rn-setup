const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {regRep, androidPath, androidSrc} = require('./utils');
const path = require('path');
const prettifyXml = require('xml-formatter');

const [apk, color = '009688'] = process.argv.slice(3);

const pth = path.join(androidSrc, 'java', ...apk.split('.'));

async function fileChanges() {
  await regRep(
    path.join(androidPath, 'build.gradle'),
    /(minSdkVersion\s=\s)(\d{2})/g,
    '$123',
  );

  await regRep(
    path.join(androidPath, 'app', 'build.gradle'),
    /^(\s+)(implementation.*swiperefresh.*\"\n)$/m,
    '$1$2$1implementation "androidx.core:core-splashscreen:1.0.0"\n',
    'core-splashscreen',
  );

  const styl = `
<!-- BootTheme should inherit from Theme.SplashScreen -->
<style name="BootTheme" parent="Theme.SplashScreen">
    <item name="windowSplashScreenBackground">@color/bootsplash_background</item>
  <item name="windowSplashScreenAnimatedIcon">@mipmap/bootsplash_logo</item>
  <item name="postSplashScreenTheme">@style/AppTheme</item>
</style>
`;

  await regRep(
    path.join(androidSrc, 'res', 'values', 'styles.xml'),
    /(\s+)(<style name="AppTheme".*<\/style>)/s,
    `$1$2\n${styl}`,
    'bootsplash',
    x => {
      const y = `<root>${x}</root>`;
      const output = prettifyXml(y, {collapseContent: true});
      return output.substring(6, output.length - 7);
    },
  );

  await regRep(
    path.join(androidSrc, 'AndroidManifest.xml'),
    '@style/AppTheme',
    '@style/BootTheme',
    'BootTheme',
  );

  await regRep(
    path.join(pth, 'MainActivity.java'),
      /(^public class MainActivity.*$)/m,
    'import com.zoontek.rnbootsplash.RNBootSplash;\n\n$1',
    'rnbootsplash',
  );

  await regRep(
    path.join(pth, 'MainActivity.java'),
    /^(\s+)(super.onCreate.*$)/m,
    '$1RNBootSplash.init(this);\n$1$2',
    'RNBootSplash.init',
  );
}

async function splash() {
  await exec('yarn add react-native-bootsplash');
  const {stdout, stderr} =
    await exec(`npx react-native generate-bootsplash assets/images/icon.png \\
  --background-color=#${color} \\
  --logo-width=100 \\
  --assets-path=assets \\
  --flavor=main`);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  await fileChanges();
}

module.exports = splash;
