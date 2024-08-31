import { playAgain } from '../../../core/stateManager.js';

export const WinComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element };
};

const render = async (element) => {
    const button = document.createElement('button');
    button.append('Play again');
    button.addEventListener('click', () => {
        playAgain();
    });
    element.append('You Win!', button);
};
