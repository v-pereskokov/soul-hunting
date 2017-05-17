#!/bin/bash

rm -rf ./public/built

tar -xzf package.tgz
rm package.tgz

mv -f archive/public/built ./public/

rm -rf archive
