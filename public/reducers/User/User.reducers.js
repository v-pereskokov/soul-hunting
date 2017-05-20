"use strict";
exports.__esModule = true;
var CheckUser_1 = require("../../service/Validators/CheckUser/CheckUser");
var User_constants_1 = require("../../constants/User/User.constants");
var initialState = {
    isAuthenticated: false,
    user: {}
};
function authentication(state, action) {
    if (state === void 0) { state = initialState; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case User_constants_1.SET_CURRENT_USER:
            return {
                isAuthenticated: CheckUser_1["default"](action.user),
                user: action.user
            };
        default:
            return state;
    }
}
exports.authentication = authentication;
