#!/bin/bash

# Extract the package
tar -xzf package.tgz
rm package.tgz

touch test/archive/public/built/top.txt
mv test/archive/public/built ./public/

rm -rf test
