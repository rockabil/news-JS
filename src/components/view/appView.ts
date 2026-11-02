import News from './news/news';
import Sources from './sources/sources';
import { IArticle, ISource } from '../../types/news-api';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: { articles: IArticle[] }): void {
        const values: IArticle[] = data?.articles ? data?.articles : [];
        console.log(values, data);
        this.news.draw(values);
    }

    drawSources<T extends { sources: ISource[] }>(data: T): void {
        const values: ISource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
