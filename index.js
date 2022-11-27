#!/usr/bin/env node

const f = {
    rename: require('./bin/rename'),
    icon: require('./bin/icon'),
    splash: require('./bin/splash'),
    nav: require('./bin/navigation'),
    structure: require('./bin/structure'),
    assets: require('./bin/assets'),
    start: require("./bin/start"),
}

const argv = require('minimist')(process.argv.slice(2));

async function setup() {
    if(argv.s) {
        f[argv.s]();
        return
    }
    console.log("start");
    await f.start();
    console.log("rename");
    await f.rename();
    console.log("structure");
    await f.structure();
    console.log("assets");
    await f.assets();
    console.log("icon");
    await f.icon();
    console.log("nav");
    await f.nav();
    console.log("splash");
    await f.splash();
}

setup();
