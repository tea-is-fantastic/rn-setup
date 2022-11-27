const fs = require("fs");
const {values} = require("lodash");
const {all_dirs, src, regRep} = require("./utils");
const path = require("path");

async function structure() {
  for (const c of values(all_dirs)) {
    fs.existsSync(c) || fs.mkdirSync(c, {recursive: true});
  }
  await fs.promises.rename(path.join(src, 'App.tsx'), path.join(src, 'src', 'App.tsx'))

  await regRep(
      path.join(src, 'index.js'),
      "import App from './App'",
      "import App from './src/App'",
      './src/App',
  );

}

module.exports = structure;
