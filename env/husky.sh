#!/bin/bash

npx husky add .husky/prepare-commit-msg "exec < /dev/tty && git cz --hook || true"
npx husky add .husky/pre-commit "npx lint-staged --allow-empty $1"
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
