import { getGridSize, movePlayer } from '../../../core/stateManager.js';
import { CellComponent } from './Cell.component.js';
import { MOVING_DIRECTIONS } from '../../../core/constants.js';

export const GridComponent = () => {
    const localState = {
        cleanupFunctions: [],
    };

    const keyupObserver = async (e) => {
        switch (e.code) {
            case 'KeyA': {
                movePlayer(1, MOVING_DIRECTIONS.LEFT);
                break;
            }
            case 'KeyD': {
                movePlayer(1, MOVING_DIRECTIONS.RIGHT);
                break;
            }
            case 'KeyW': {
                movePlayer(1, MOVING_DIRECTIONS.UP);
                break;
            }
            case 'KeyS': {
                movePlayer(1, MOVING_DIRECTIONS.DOWN);
                break;
            }
            case 'ArrowLeft': {
                movePlayer(2, MOVING_DIRECTIONS.LEFT);
                break;
            }
            case 'ArrowRight': {
                movePlayer(2, MOVING_DIRECTIONS.RIGHT);
                break;
            }
            case 'ArrowUp': {
                movePlayer(2, MOVING_DIRECTIONS.UP);
                break;
            }
            case 'ArrowDown': {
                movePlayer(2, MOVING_DIRECTIONS.DOWN);
                break;
            }
        }
    };

    document.addEventListener('keyup', keyupObserver);

    const element = document.createElement('table');
    element.classList.add('grid');

    render(element, localState);

    return {
        element,
        cleanup: () => {
            localState.cleanupFunctions.forEach((cf) => cf());
            document.removeEventListener('keyup', keyupObserver);
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
