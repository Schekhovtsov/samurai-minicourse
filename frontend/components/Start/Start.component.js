import { start } from '../../../core/stateManager.js';

export const StartComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element };
};

const render = async (element) => {
    const button = document.createElement('button');
    button.append('Start game');
    button.addEventListener('click', () => {
        start();
    });
    element.append(button);
};
