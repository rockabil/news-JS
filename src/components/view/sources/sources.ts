import './sources.css';

import { ISource } from '../../../types/news-api';

class Sources {
    draw(data: ISource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            console.error('Template #sourceItemTemp is not found.');
            return;
        }

        data.forEach((item: ISource) => {
            const sourceClone: DocumentFragment = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const nameElement: HTMLElement | null = sourceClone.querySelector('.source__item-name');
            const itemElement: HTMLElement | null = sourceClone.querySelector('.source__item');

            if (nameElement) {
                nameElement.textContent = item.name;
            }
            if (itemElement) {
                itemElement.setAttribute('data-source-id', item.id || '');
            }

            fragment.append(sourceClone);
        });

        const sourceContainer = document.querySelector('.sources');
        if (sourceContainer) {
            sourceContainer.append(fragment);
        } else {
            console.error('Container .sources is not found');
        }
    }
}

export default Sources;
