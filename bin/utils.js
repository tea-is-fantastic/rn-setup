const fs = require('fs/promises');
const replace = require('replace-in-file');
const path = require("path");

async function regRep(files, reg, rep, already, callback){
  try {
    const filecont = await fs.readFile(files, 'utf-8');
    if (already && filecont.includes(already)) {
      return;
    }
    let to = rep;
    if (callback) {
      to = input => callback(input.replace(reg, rep));
    }
    const results = await replace({
      files,
      from: reg,
      to,
    });
    console.log('Replacement results:', results);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

const src = path.join(process.cwd());
const androidPath = path.join(src, 'android');
const androidSrc = path.join(androidPath, 'app', 'src', 'main');

const rn_src = path.join(src, 'src')
const rn_assets = path.join(src, 'assets')
const rn_screens = path.join(rn_src, 'screens')
const rn_components = path.join(rn_src, 'components')
const rn_theme = path.join(rn_src, 'theme')
const rn_providers = path.join(rn_src, 'providers')
const rn_models = path.join(rn_src, 'models')
const rn_shared = path.join(rn_src, 'shared')

const all_dirs = [rn_src, rn_assets, rn_screens, rn_components, rn_theme, rn_providers, rn_models, rn_shared]

module.exports = {regRep, src, androidPath, androidSrc, all_dirs};
