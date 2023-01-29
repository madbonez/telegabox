"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
async function getToken(event, getTokenHttpFn) {
    const { code } = JSON.parse(event.body);
    if (!code) {
        throw Error('code param is required in query');
    }
    const response = await getTokenHttpFn(code);
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
}
exports.getToken = getToken;
;
