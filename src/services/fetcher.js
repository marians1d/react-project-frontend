const baseUrl = 'http://localhost:3001/api';

const fetcher = async (method, url, data, isFormData = false) => {
    try {
        const user = localStorage.getItem('auth');
        const auth = JSON.parse(user || '{}');

        let headers = {};
        if (auth.accessToken) {
            headers['x-authorization'] = auth.accessToken;
        }

        if (!isFormData) {
            headers['content-type'] = 'application/json';
        }
        
        let options = { method };
        if (method === 'GET') {
            options.headers = headers;
        } else {
            options = {
                method,
                headers,
                body: !isFormData ? JSON.stringify(data) : data
            };
        }


        const response = await fetch(`${baseUrl}${url}`, options);

        if (response.status === 204) {
            return { success: true };
        }

        if (response.status === 401) {
            localStorage.setItem('auth', JSON.stringify({}));
        }

        const result = await response.json();

        if (result.status === 'error') {
            throw result;
        }

        return result;
    } catch (err) {
        throw err;
    }
};

export const get = fetcher.bind(null, 'GET');
export const post = fetcher.bind(null, 'POST');
export const patch = fetcher.bind(null, 'PATCH');
export const put = fetcher.bind(null, 'PUT');
export const del = fetcher.bind(null, 'DELETE');