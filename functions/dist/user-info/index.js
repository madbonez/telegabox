"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const axios_1 = __importDefault(require("axios"));
const handler = async function (event, context) {
    const result = await axios_1.default.get('https://login.yandex.ru/info?format=json', {
        headers: {
            'Authorization': `OAuth ${event.headers.Authorization?.replace('Bearer ', '')}`
        }
    })
        .then(resp => resp.data);
    return {
        statusCode: 200,
        body: result,
    };
};
exports.handler = handler;
