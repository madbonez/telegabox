"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const get_token_http_1 = require("./get-token-http");
async function getToken(event, getTokenHttpFn) {
    const { code } = JSON.parse(event.body);
    if (!code) {
        throw Error('code param is required in query');
    }
    const response = await (0, get_token_http_1.getTokenHttp)(code);
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
}
exports.getToken = getToken;
;
