import { Handler } from "@yandex-cloud/function-types";
import axios from "axios";

export const handler: Handler.ApiGateway.Authorizer = async function (event, context) {
    let response = {
        isAuthorized: false,
        context: {}
    };

    const result = await axios.get(
        'https://login.yandex.ru/info?format=json',
        {
            headers: {
                'Authorization': `OAuth ${event.headers.Authorization?.replace('Bearer ', '')}`
            }
        })
        .then(resp => resp.data)
        .catch((err) => {
            console.info('auth error with ', err);
            return null;
        });

    if (result) {
        response.isAuthorized = true;
    }

    return response;
};