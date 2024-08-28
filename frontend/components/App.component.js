import { GAME_STATUSES } from '../../core/constants.js';
import { getGameStatus, subscribe } from '../../core/stateManager.js';
import { GridComponent } from './Grid/Grid.component.js';
import { LoseComponent } from './Lose/Lose.component.js';
import { ResultPanelComponent } from './ResultPanel/ResultPanel.component.js';
import { SettingsComponent } from './Settings/Settings.component.js';
import { StartComponent } from './Start/Start.component.js';

export const AppComponent = () => {
    const props = {
        localState: {
            prevGameStatus: null,
            cleanupFunctions: [],
        },
    };

    const element = document.createElement('div');

    subscribe(() => {
        render(element, props);
    });

    render(element, props);

    return { element };
};

const render = async (element, { localState }) => {
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
        default: {
            throw new Error(`Should not implemented`);
        }
    }
};
