"use strict";
exports.__esModule = true;
var Form_constants_1 = require("../../constants/Form/Form.constants");
function error(state, action) {
    if (state === void 0) { state = ''; }
    if (action.type === Form_constants_1.SET_LOGIN_ERROR) {
        return action.error;
    }
    return state;
}
exports["default"] = error;
