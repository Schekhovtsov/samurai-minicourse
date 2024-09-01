import { GAME_STATUSES } from '../../core/constants.js';
import { getGameStatus, subscribe } from '../../core/stateManager.proxy.js';
import { GridComponent } from './Grid/Grid.component.js';
import { LoseComponent } from './Lose/Lose.component.js';
import { WinComponent } from './Win/Win.component.js';
import { ResultPanelComponent } from './ResultPanel/ResultPanel.component.js';
import { SettingsComponent } from './Settings/Settings.component.js';
import { StartComponent } from './Start/Start.component.js';
import { AudioComponent } from './Audio/Audio.component.js';

export const AppComponent = () => {
    const localState = {
        prevGameStatus: null,
        cleanupFunctions: [],
    };

    const props = {};

    const audioComponent = AudioComponent();

    const element = document.createElement('div');

    subscribe(() => {
        render(element, props, localState);
    });

    render(element, props, localState);

    return { element };
};

const render = async (element, props, localState) => {
    element.classList.add('container');

    const gameStatus = await getGameStatus();

    if (localState.prevGameStatus === gameStatus) {
        return;
    }

    localState.prevGameStatus = gameStatus;

    localState.cleanupFunctions.forEach((cf) => cf());
    localState.cleanupFunctions = [];

    element.innerHTML = '';

    switch (gameStatus) {
        case GAME_STATUSES.SETTINGS: {
            const settingsComponent = SettingsComponent();
            const startComponent = StartComponent();

            element.append(settingsComponent.element, startComponent.element);

            break;
        }
        case GAME_STATUSES.IN_PROGRESS: {
            const settingsComponent = SettingsComponent();
            const resultPanelComponent = ResultPanelComponent();
            const gridComponent = GridComponent();
            localState.cleanupFunctions.push(gridComponent.cleanup);
            localState.cleanupFunctions.push(resultPanelComponent.cleanup);

            element.append(
                settingsComponent.element,
                resultPanelComponent.element,
                gridComponent.element
            );

            break;
        }
        case GAME_STATUSES.LOSE: {
            const loseComponent = LoseComponent();

            element.append(loseComponent.element);

            break;
        }
        case GAME_STATUSES.WIN: {
            const winComponent = WinComponent();

            element.append(winComponent.element);

            break;
        }
        default: {
            throw new Error(`Should not implemented`);
        }
    }
};
