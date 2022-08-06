const baseUrl = process.env.API_URL || 'http://localhost:3001/api';

const fetcher = async (method, url, data) => {
    try {
        const user = localStorage.getItem('auth');
        const auth = JSON.parse(user || '{}');

        let headers = {};
        if (auth.accessToken) {
            headers['x-authorization'] = auth.accessToken;
        }
        
        let options = { method };
        if (method === 'GET') {
            options.headers = headers;
        } else {
            options = {
                method,
                headers: {
                    ...headers,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            };
        }


        const response = await fetch(`${baseUrl}${url}`, options);

        const result = await response.json();

        return result;
    } catch (err) {
        console.error(err);
    }
};

export const get = fetcher.bind(null, 'GET');
export const post = fetcher.bind(null, 'POST');
export const patch = fetcher.bind(null, 'PATCH');
export const put = fetcher.bind(null, 'PUT');
export const del = fetcher.bind(null, 'DEL');