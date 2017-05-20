"use strict";
exports.__esModule = true;
var PreLoader_constants_1 = require("../../constants/PreLoader/PreLoader.constants");
function preloader(state, action) {
    if (state === void 0) { state = false; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case PreLoader_constants_1.TOGGLE__PRELOADER:
            return !state;
        default:
            return state;
    }
}
exports["default"] = preloader;
