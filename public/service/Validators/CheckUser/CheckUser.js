"use strict";
exports.__esModule = true;
var isEmpty = function (word) {
    if (word) {
        if (word.trim().length !== 0) {
            return true;
        }
    }
    return false;
};
exports["default"] = isEmpty;
