import { EVENTS } from '../../../core/constants.js';
import {
    getGooglePoints,
    getPlayerPoints,
    subscribe,
    unsubscribe,
} from '../../../core/stateManager.proxy.js';

export const ResultPanelComponent = () => {
    const element = document.createElement('div');

    const observer = (e) => {
        if (e.name === EVENTS.SCORES_CHANGED) {
            render(element);
        }
    };

    subscribe(observer);

    render(element);

    return {
        element,
        cleanup: () => {
            unsubscribe(observer);
        },
    };
};

const render = async (element) => {
    element.innerHTML = '';

    const googlePoints = await getGooglePoints();
    const player1Points = await getPlayerPoints(1);
    const player2Points = await getPlayerPoints(2);

    element.append(
        `Player 1: ${player1Points}, Player2: ${player2Points}, Google: ${googlePoints}`
    );
};
