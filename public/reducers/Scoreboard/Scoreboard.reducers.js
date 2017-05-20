"use strict";
exports.__esModule = true;
function page(state, action) {
    if (state === void 0) { state = 1; }
    if (action === void 0) { action = {}; }
    switch (action.type) {
        case 'ADD_PAGE':
            return ++state;
        default:
            return state;
    }
}
exports.page = page;
function users(state, action) {
    if (state === void 0) { state = []; }
    switch (action.type) {
        case 'ADD_USER':
            return state.concat(action.data);
        default:
            return state;
    }
}
exports.users = users;
