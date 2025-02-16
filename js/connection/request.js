import { dto } from './dto.js';

export const HTTP_GET = 'GET';
export const HTTP_PUT = 'PUT';
export const HTTP_POST = 'POST';
export const HTTP_PATCH = 'PATCH';
export const HTTP_DELETE = 'DELETE';

export const HTTP_STATUS_OK = 200;
export const HTTP_STATUS_CREATED = 201;
export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

export const request = (method, path) => {

    const ac = new AbortController();

    let req = {
        signal: ac.signal,
        method: String(method).toUpperCase(),
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
    };

    window.addEventListener('offline', () => ac.abort());
    window.addEventListener('popstate', () => ac.abort());
    window.addEventListener('beforeunload', () => ac.abort());

    return {
        /**
         * @template T
         * @param {((data: any) => T)=} transform
         * @returns {Promise<ReturnType<typeof dto.baseResponse<T>>>}
         */
        send(transform = null) {
            // Simulate a static response
            return new Promise((resolve) => {
                const res = {
                    code: HTTP_STATUS_OK,
                    data: {
                        message: 'Static response data'
                    },
                    error: null
                };

                if (transform) {
                    res.data = transform(res.data);
                }

                resolve(dto.baseResponse(res.code, res.data, res.error));
            });
        },
        /**
         * @returns {Promise<boolean>}
         */
        download() {
            // Simulate a static download response
            return new Promise((resolve) => {
                const filename = 'static_download.csv';
                const blob = new Blob(['Static,CSV,Content'], { type: 'text/csv' });
                const link = document.createElement('a');
                const href = window.URL.createObjectURL(blob);

                link.href = href;
                link.download = filename;
                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(href);

                resolve(true);
            });
        },
        /**
         * @param {string} token
         * @returns {ReturnType<typeof request>}
         */
        token(token) {
            if (token.split('.').length === 3) {
                req.headers.append('Authorization', 'Bearer ' + token);
                return this;
            }

            req.headers.append('x-access-key', token);
            return this;
        },
        /**
         * @param {object} body
         * @returns {ReturnType<typeof request>}
         */
        body(body) {
            req.body = JSON.stringify(body);
            return this;
        },
    };
};