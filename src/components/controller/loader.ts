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

    public getResp<T>(
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

    private makeUrl(options: Partial<IRequestOptions>, endpoint: ApiEndpoint): string {
        const params = new URLSearchParams();

        const merged: Record<string, string | number | boolean | undefined> = {
            ...this.options,
            ...options,
        };

        Object.entries(merged).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                params.append(key, String(value));
            }
        });

        return `${this.baseLink}${endpoint}?${params.toString()}`;
    }

    private load<T>(
        method: 'GET' | 'POST',
        endpoint: ApiEndpoint,
        callback: ApiCallback<T>,
        options: IRequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler.bind(this))
            .then((res) => res.json() as Promise<T>)
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
