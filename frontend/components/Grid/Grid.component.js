import { getGridSize } from '../../../core/stateManager.js';
import { CellComponent } from './Cell.component.js';

export const GridComponent = () => {
    const localState = {
        cleanupFunctions: [],
    };

    const element = document.createElement('table');
    element.classList.add('grid');

    render(element, localState);

    return {
        element,
        cleanup: () => {
            localState.cleanupFunctions.forEach((cf) => cf());
        },
    };
};

const render = async (element, localState) => {
    localState.cleanupFunctions.forEach((cf) => cf());
    localState.cleanupFunctions = [];

    element.innerHTML = '';

    const gridSize = await getGridSize();

    for (let y = 0; y < gridSize.rowsCount; y++) {
        const rowElement = document.createElement('tr');

        for (let x = 0; x < gridSize.columnsCount; x++) {
            const cellComponent = CellComponent({ x, y });
            localState.cleanupFunctions.push(cellComponent.cleanup);

            rowElement.append(cellComponent.element);
        }

        element.append(rowElement);
    }
};
