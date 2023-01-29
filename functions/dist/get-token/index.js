"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const get_token_1 = require("./get-token");
const get_token_http_1 = require("./get-token-http");
const handler = async function (event, context) {
    return await (0, get_token_1.getToken)(event, get_token_http_1.getTokenHttp);
};
exports.handler = handler;
