import AppLoader from './appLoader';
import { ApiEndpoint } from '../../types/api-endpoint';
import { ISource, IArticle } from '../../types/news-api';

interface SourceResponse {
    sources: ISource[];
}

interface NewsResponse {
    articles: IArticle[];
}

type SourcesCallback = (data: SourceResponse) => void;
type NewsCallback = (data: NewsResponse) => void;

class AppController extends AppLoader {
    public getSources(callback: SourcesCallback): void {
        super.getResp<SourceResponse>(
            {
                endpoint: ApiEndpoint.Sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: NewsCallback): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId || '');
                    super.getResp<NewsResponse>(
                        {
                            endpoint: ApiEndpoint.Everything,
                            options: {
                                sources: sourceId || '',
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
