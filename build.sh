#!/bin/bash

set -e
set -x

yarn install
yarn test
yarn lint
