#!/usr/bin/env node

const {excute} = require("../shelljs/excute");
excute(`npx standard-version --dry-run`);