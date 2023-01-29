import { Http } from '@yandex-cloud/function-types/dist/src/http';
import assert from 'node:assert/strict';
import { getToken } from './get-token';

async function shouldReturnToken() {
    const resp = await getToken(
        {
            body: JSON.stringify({
                code: 6253791
            })
        } as any,
        () => {
            return Promise.resolve({
                accessToken: 'accessToken',
                refreshToken: 'refreshToken',
            })
        });

    assert.ok(resp.body)
    assert.deepEqual(JSON.parse(resp.body), {
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
    })
}

shouldReturnToken();