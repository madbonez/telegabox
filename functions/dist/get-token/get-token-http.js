"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenHttp = void 0;
const axios_1 = __importDefault(require("axios"));
const clientId = '2c78397a07bb4082a9ce340ca688c0d7';
const clientSecret = 'ea652a6dafeb4ba28feb71cd6a5664aa';
async function getTokenHttp(code) {
    return await axios_1.default.post('https://oauth.yandex.ru/token', new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': clientId,
        'client_secret': clientSecret,
    }), {
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    })
        .then(resp => resp.data)
        .then(({ access_token: accessToken, refresh_token: refreshToken }) => {
        return {
            accessToken,
            refreshToken,
        };
    });
}
exports.getTokenHttp = getTokenHttp;
;
