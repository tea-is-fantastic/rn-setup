#!/usr/bin/env node

const rename = require('./bin/rename');
const icon = require('./bin/icon');
const splash = require('./bin/splash');
const nav = require('./bin/navigation');
const structure = require('./bin/structure');
const assets = require('./bin/assets');
const start = require("./bin/start");


async function setup() {
    await start();
    await rename();
    await structure();
    await assets();
    await icon();
    await nav();
    await splash();
}

setup();
