import { AppComponent } from './components/App.component.js';
import { subscribe, unsubscribe } from '../core/stateManager.js';

const rootElement = document.getElementById('root');

const renderApp = () => {
    rootElement.innerHTML = '';

    const appComponent = AppComponent();

    rootElement.append(appComponent.element);
};

renderApp();

subscribe(renderApp);
