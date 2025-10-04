#!/usr/bin/env bash
set -ex

# Enable Corepack (included with Node 22)
corepack enable

# Activate the correct Yarn version (from package.json)
corepack prepare yarn@4.6.0 --activate

# Install dependencies using Yarn 4
yarn install --immutable

# Build your app (adjust if you use another command)
yarn build
