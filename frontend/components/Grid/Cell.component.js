import {
    getGooglePosition,
    getPlayerPositions,
} from '../../../core/stateManager.js';
import { GoogleComponent } from '../common/Google.component.js';
import { PlayerComponent } from '../common/Player.component.js';

export const CellComponent = (props) => {
    const element = document.createElement('td');

    render(element, props);

    return { element };
};

const render = async (element, { x, y }) => {
    const googlePosition = await getGooglePosition();
    const player1Position = await getPlayerPositions(1);
    const player2Position = await getPlayerPositions(2);

    if (googlePosition.x === x && googlePosition.y === y) {
        element.append(GoogleComponent().element);
    }

    if (player1Position.x === x && player1Position.y === y) {
        element.append(PlayerComponent({ playerNumber: 1 }).element);
    }

    if (player2Position.x === x && player2Position.y === y) {
        element.append(PlayerComponent({ playerNumber: 2 }).element);
    }
};
