import { EVENTS } from '../../../core/constants.js';
import {
    getGooglePosition,
    getPlayerPositions,
    subscribe,
    unsubscribe,
} from '../../../core/stateManager.js';
import { GoogleComponent } from '../common/Google.component.js';
import { PlayerComponent } from '../common/Player.component.js';

export const CellComponent = (props) => {
    const { x, y } = props;
    const element = document.createElement('td');

    const observer = (e) => {
        if (
            [
                EVENTS.GOOGLE_JUMPED,
                EVENTS.PLAYER1_MOVED,
                EVENTS.PLAYER2_MOVED,
            ].every((name) => name !== e.name)
        ) {
            return;
        }

        if (e.payload.prevPosition.x === x && e.payload.prevPosition.y === y) {
            render(element, props);
        }

        if (e.payload.newPosition.x === x && e.payload.newPosition.y === y) {
            render(element, props);
        }
    };

    subscribe(observer);

    render(element, props);

    return {
        element,
        cleanup: () => {
            unsubscribe(observer);
        },
    };
};

const render = async (element, { x, y }) => {
    element.innerHTML = '';

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
