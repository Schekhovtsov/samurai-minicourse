import { GridComponent } from './Grid/Grid.component.js';
import { ResultPanelComponent } from './ResultPanel/ResultPanel.component.js';
import { SettingsComponent } from './Settings/Settings.component.js';

export const AppComponent = () => {
    const element = document.createElement('div');

    render(element);

    return { element };
};

const render = async (element) => {
    element.classList.add('container');

    const settingsComponent = SettingsComponent();
    const resultPanelComponent = ResultPanelComponent();
    const gridComponent = GridComponent();

    element.append(
        settingsComponent.element,
        resultPanelComponent.element,
        gridComponent.element
    );
};
