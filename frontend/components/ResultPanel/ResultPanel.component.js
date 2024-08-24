import {
    getGooglePoints,
    getPlayerPoints,
    subscribe,
} from '../../../core/stateManager.js';

export const ResultPanelComponent = () => {
    const element = document.createElement('div');

    subscribe(() => {
        render(element);
    });

    render(element);

    return { element };
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
