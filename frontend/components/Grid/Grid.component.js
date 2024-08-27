import {
    getGridSize,
    subscribe,
    unsubscribe,
} from '../../../core/stateManager.js';
import { CellComponent } from './Cell.component.js';

export const GridComponent = () => {
    console.log('GRID COMPONENT CREATION');
    const element = document.createElement('table');
    element.classList.add('grid');

    const observer = () => {
        render(element);
    };

    subscribe(observer);

    render(element);

    return {
        element,
        cleanup: () => {
            console.log('--- GRID CLEAN UP ---');
            unsubscribe(observer);
        },
    };
};

const render = async (element) => {
    console.log('GRID RENDER');
    element.innerHTML = '';

    const gridSize = await getGridSize();

    for (let y = 0; y < gridSize.rowsCount; y++) {
        const rowElement = document.createElement('tr');

        for (let x = 0; x < gridSize.columnsCount; x++) {
            const cellComponent = CellComponent({ x, y });
            rowElement.append(cellComponent.element);
        }

        element.append(rowElement);
    }
};
