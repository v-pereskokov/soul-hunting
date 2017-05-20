"use strict";
exports.__esModule = true;
var Mobile_constants_1 = require("../../constants/Mobile/Mobile.constants");
function device(state, action) {
    if (state === void 0) { state = true; }
    if (action.type === Mobile_constants_1.SET_DEVICE) {
        return action.device;
    }
    return state;
}
exports["default"] = device;
