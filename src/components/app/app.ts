import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IArticle, ISource } from '../../types/news-api';

interface NewsResponse {
    articles: IArticle[];
}

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesContainer = document.querySelector('.sources');
        if (!sourcesContainer) {
            console.error('Container .sources is not found in DOM');
            return;
        }

        sourcesContainer.addEventListener('click', (e: Event) => {
            const mouseEvent = e as MouseEvent;
            this.controller.getNews(mouseEvent, (data: NewsResponse) => {
                this.view.drawNews(data);
            });
        });
        this.controller.getSources((data: ISource[] | { sources?: ISource[] }) => {
            const sources = Array.isArray(data) ? data : data.sources || [];
            this.view.drawSources({ sources });
        });
    }
}

export default App;
