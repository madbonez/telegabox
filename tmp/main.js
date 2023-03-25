document.addEventListener("DOMContentLoaded", () => {
    const clientId = '2c78397a07bb4082a9ce340ca688c0d7';
    document.querySelector('#enter').setAttribute('href', `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}`);

    const params = (new URL(document.location)).searchParams;
    const code = params.get('code');

    console.log(code);

    document.querySelector('#exit').addEventListener('click', () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
    })
    document.querySelector('#test').addEventListener('click', () => {
        fetch('https://functions.yandexcloud.net/d4eupjnjleb40ceodjik', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(resp => resp.json())
        .then(console.log)
    })

    if (code) {
        // fetch('https://oauth.yandex.ru/token', {
        //     method: 'POST',
        //     headers: {
        //         'Content-type': 'application/x-www-form-urlencoded'
        //     },
        //     body: new URLSearchParams({
        //         'grant_type': 'authorization_code',
        //         'code': code,
        //         'client_id': clientId,
        //         'client_secret': clientSecret,
        //     })
        // })
        //     .then(resp => resp.json())
        //     .then(({ access_token: accessToken, refresh_token: refreshToken }) => {
        //         if (accessToken && refreshToken) {
                    
                    
        //             localStorage.setItem('token', accessToken);
        //             localStorage.setItem('refresh_token', refreshToken);


        //             const params = (new URL(document.location)).searchParams;
        //             const code = params.delete('code');
        //             window.history.replaceState(null, null, window.location.pathname)

        //             // curl -d "{\"yandexPassportOauthToken\":\"<OAuth-token>\"}" "https://iam.api.cloud.yandex.net/iam/v1/tokens"

        //         }
        //     })


    } else {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            window.location = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}`;
        }
    }
})
