import { IRequestOptions, IRequestParams } from '../../types/news-api';
import { ApiEndpoint } from '../../types/api-endpoint';

interface IApiOptions {
    apiKey: string;
    [key: string]: string | number | boolean;
}

type ApiCallback<T> = (data: T) => void;

class Loader {

    private baseLink: string;
    private options: IApiOptions;


    constructor(baseLink: string, options: IApiOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: IRequestParams,
        callback: ApiCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: IRequestOptions, endpoint: ApiEndpoint): string {
        const urlOptions = { ...this.options, ...options } as { [key: string]: string };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            const value = urlOptions[key];
            if (value !== undefined && value !== null) {
                url += `${key}=${urlOptions[key]}&`;
            }
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: 'GET' | 'POST',
        endpoint: ApiEndpoint,
        callback: ApiCallback<T>,
        options: IRequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
