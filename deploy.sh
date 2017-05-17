#!/bin/bash

#rm -rf public

mkdir test
mv package.tgz test/
cd test

# Extract the package
tar -xzf package.tgz
rm package.tgz 
