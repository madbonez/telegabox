import { Handler } from "@yandex-cloud/function-types";
import axios from 'axios';

const clientId = '2c78397a07bb4082a9ce340ca688c0d7';
const clientSecret = 'ea652a6dafeb4ba28feb71cd6a5664aa';

export async function getTokenHttp(code: string): Promise<{
    accessToken: string,
    refreshToken: string,
}> {
    return await axios.post(
        'https://oauth.yandex.ru/token',
        new URLSearchParams({
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': clientId,
            'client_secret': clientSecret,
        }),
        {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then(resp => resp.data)
        .then(({ access_token: accessToken, refresh_token: refreshToken }) => {
            return {
                accessToken,
                refreshToken,
            }
        })
};

