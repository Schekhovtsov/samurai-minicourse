import { AppComponent } from './components/App.component.js';
import { subscribe, unsubscribe } from '../core/stateManager.js';

const rootElement = document.getElementById('root');

rootElement.innerHTML = '';

const appComponent = AppComponent();

rootElement.append(appComponent.element);
