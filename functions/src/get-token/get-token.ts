import { Http } from "@yandex-cloud/function-types/dist/src/http";
import { getTokenHttp } from "./get-token-http";

export async function getToken(event: Http.Event, getTokenHttpFn: typeof getTokenHttp): Promise<Http.Result> {
    const { code } = JSON.parse(event.body);
    if (!code) {
        throw Error('code param is required in query');
    }

    const response = await getTokenHttp(code);


    return {
        statusCode: 200,
        body: JSON.stringify(response),
    }
};

