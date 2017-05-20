#!/bin/bash

tsc --target es5 public/service/Transport/Transoprt.ts
tsc --target es5 public/service/Validators/isFill/isFill.ts
tsc --target es5 public/service/Validators/isLogin/isLogin.ts
tsc --target es5 public/service/Validators/isEmail/isEmail.ts
tsc --target es5 public/service/Validators/isPassword/isPassword.ts

jasmine JASMINE_CONFIG_PATH=test/unit/jasmine.json

rm public/service/Transport/Transoprt.js
rm public/service/Validators/isFill/isFill.js
rm public/service/Validators/isLogin/isLogin.js
rm public/service/Validators/isEmail/isEmail.js
rm public/service/Validators/isPassword/isPassword.js
