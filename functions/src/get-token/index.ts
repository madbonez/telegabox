import { Handler } from "@yandex-cloud/function-types";
import { getToken } from "./get-token";
import { getTokenHttp } from "./get-token-http";

export const handler: Handler.Http = async function (event, context) {
    return await getToken(event, getTokenHttp);
};

