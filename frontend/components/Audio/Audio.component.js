import { subscribe } from '../../../core/stateManager.proxy.js';
import { EVENTS, GAME_STATUSES } from './../../../core/constants.js';

export const AudioComponent = () => {
    const winAudio = new Audio('assets/sounds/win.mp3');
    const loseAudio = new Audio('assets/sounds/lose.mp3');

    subscribe((e) => {
        if (e.name === EVENTS.STATUS_CHANGED) {
            if (e.payload.gameStatus === GAME_STATUSES.WIN) {
                winAudio.play();
            } else if (e.payload.gameStatus === GAME_STATUSES.LOSE) {
                loseAudio.play();
            }
        }
    });
};
