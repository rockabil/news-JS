import './news.css';
import { IArticle } from '../../../types/news-api';

class News {
    draw(data: IArticle[]): void {
        const news: IArticle[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        if (!newsItemTemp) {
            console.error('Template #newsItemTemp is not found DOM.');
            return;
        }
        console.log(news);

        news.forEach((item: IArticle, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItemElement = newsClone.querySelector('.news__item');

            if (newsItemElement && idx % 2) {
                newsItemElement.classList.add('alt');
            }

            const metaPhotoEl: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            const metaAuthorEl: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            const metaDateEl: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            const descTitleEl: HTMLElement | null = newsClone.querySelector('.news__description-title');
            const descSourceEl: HTMLElement | null = newsClone.querySelector('.news__description-source');
            const descContentEl: HTMLElement | null = newsClone.querySelector('.news__description-content');
            const readMoreLinkEl: HTMLElement | null = newsClone.querySelector('.news__read-more a');
            if (metaPhotoEl) {
                metaPhotoEl.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            if (metaAuthorEl) {
                metaAuthorEl.textContent = item.author || item.source.name;
            }
            if (metaDateEl) {
                metaDateEl.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }
            if (descTitleEl) {
                descTitleEl.textContent = item.title;
            }
            if (descSourceEl) {
                descSourceEl.textContent = item.source.name;
            }
            if (descContentEl) {
                descContentEl.textContent = item.description || '';
            }
            if (readMoreLinkEl) {
                readMoreLinkEl.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsContainer: HTMLElement | null = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        } else {
            console.error('Container .news is not found in DOM.');
        }
    }
}

export default News;
