const fs = require('fs');
const {ensureFile} = require('fs-extra');
const replace = require('replace-in-file');
const path = require("path");
const YAML = require("yaml");
const util = require('util');
const stream = require('stream');
const axios = require("axios");
const pipeline = util.promisify(stream.pipeline);

async function regRep(files, reg, rep, already, callback){
  try {
    const filecont = await fs.promises.readFile(files, 'utf-8');
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
const dataPath = path.join(src, 'data');
const androidPath = path.join(src, 'android');
const androidSrc = path.join(androidPath, 'app', 'src', 'main');

const rn_src = path.join(src, 'src')
const rn_assets = path.join(src, 'assets')
const rn_fonts = path.join(rn_assets, 'fonts')
const rn_images = path.join(rn_assets, 'images')
const rn_svg = path.join(rn_assets, 'svg')
const rn_screens = path.join(rn_src, 'screens')
const rn_components = path.join(rn_src, 'components')
const rn_theme = path.join(rn_src, 'theme')
const rn_providers = path.join(rn_src, 'providers')
const rn_models = path.join(rn_src, 'models')
const rn_shared = path.join(rn_src, 'shared')

const all_dirs = {rn_src, rn_assets, rn_fonts, rn_images, rn_svg, rn_screens, rn_components, rn_theme, rn_providers, rn_models, rn_shared}

const yamls = {
  app: YAML.parse(fs.readFileSync(path.join(dataPath, 'app.yaml'), 'utf8')),
  assets: YAML.parse(fs.readFileSync(path.join(dataPath, 'assets.yaml'), 'utf8')),
  colors: YAML.parse(fs.readFileSync(path.join(dataPath, 'colors.yaml'), 'utf8')),
};


const downloadFile = async (loc, pth) => {
  try {
    await ensureFile(pth);
    const request = await axios.get(loc, {
      responseType: 'stream',
    });
    await pipeline(request.data, fs.createWriteStream(pth));
    console.log(`download ${loc} successful`);
  } catch (error) {
    console.error('download pipeline failed', error);
  }
}

module.exports = {regRep, src, androidPath, androidSrc, all_dirs, dataPath, yamls, downloadFile};
