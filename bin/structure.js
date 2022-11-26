const fs = require("fs");
const prom = require("fs/promises");
const {all_dirs, src, regRep} = require("./utils");
const path = require("path");

async function structure() {
  for (const c of all_dirs) {
    fs.existsSync(c) || fs.mkdirSync(c, {recursive: true});
  }
  await prom.rename(path.join(src, 'App.tsx'), path.join(src, 'src', 'App.tsx'))

  await regRep(
      path.join(src, 'index.js'),
      "import App from './App'",
      "import App from './src/App'",
      './src/App',
  );

}

module.exports = structure;
