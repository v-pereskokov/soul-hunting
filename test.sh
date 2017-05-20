#!/bin/bash

tsc public/service/Transport/Transoprt.ts

jasmine JASMINE_CONFIG_PATH=test/unit/jasmine.json

rm public/service/Transport/Transoprt.js
