#!/bin/bash

cd `dirname $0`

#rm -rf public

mkdir test
cd test

# Extract the package
tar -xzf package.tgz
rm package.tgz