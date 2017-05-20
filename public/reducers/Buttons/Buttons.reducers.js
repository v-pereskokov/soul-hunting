"use strict";
exports.__esModule = true;
var Buttons_constants_1 = require("../../constants/Buttons/Buttons.constants");
var initialState = [
    {
        current: '1'
    },
    {
        button: true
    },
    {
        button: false
    },
    {
        button: false
    }
];
function buttons(state, action) {
    if (state === void 0) { state = initialState; }
    if (action.type === Buttons_constants_1.NEXT_BUTTON) {
        return action.payload;
    }
    return state;
}
exports["default"] = buttons;
