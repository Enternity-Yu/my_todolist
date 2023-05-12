#!/usr/bin/env bash
set -e

npm i
npm run lint
npm run test:coverage
