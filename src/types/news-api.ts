import { ApiEndpoint } from "../components/controller/controller";

export interface IArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface INewsApiResponse {
    status: 'ok' | 'error';
    totalResults: number;
    articles: IArticle[];
    code?: string;
    message?: string;
}

export interface ISource {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface IRequestOptions {
    sources?: string;
}

export interface IRequestParams {
    endpoint: ApiEndpoint;
    options?: IRequestOptions;
}