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

    const localState = {
        renderVersion: 0,
    };

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
            render(element, props, localState);
        }

        if (e.payload.newPosition.x === x && e.payload.newPosition.y === y) {
            render(element, props, localState);
        }
    };

    subscribe(observer);

    render(element, props, localState);

    return {
        element,
        cleanup: () => {
            unsubscribe(observer);
        },
    };
};

const render = async (element, { x, y }, localState) => {
    localState.renderVersion++;
    const currentRenderVersion = localState.renderVersion;

    element.innerHTML = '';

    const googlePosition = await getGooglePosition();
    const player1Position = await getPlayerPositions(1);
    const player2Position = await getPlayerPositions(2);

    if (currentRenderVersion < localState.renderVersion) {
        return;
    }

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
