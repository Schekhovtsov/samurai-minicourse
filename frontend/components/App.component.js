import { GAME_STATUSES } from '../../core/constants.js';
import { getGameStatus } from '../../core/stateManager.js';
import { GridComponent } from './Grid/Grid.component.js';
import { LoseComponent } from './Lose/Lose.component.js';
import { ResultPanelComponent } from './ResultPanel/ResultPanel.component.js';
import { SettingsComponent } from './Settings/Settings.component.js';
import { StartComponent } from './Start/Start.component.js';

export const AppComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element };
};

const render = async (element) => {
    element.classList.add('container');

    const gameStatus = await getGameStatus();
    console.log(gameStatus);
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
