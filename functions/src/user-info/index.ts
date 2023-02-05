import { Handler } from "@yandex-cloud/function-types";
import axios from "axios";

export const handler: Handler.Http = async function (event, context) {

    const result = await axios.get(
        'https://login.yandex.ru/info?format=json',
        {
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