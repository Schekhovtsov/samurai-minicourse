import { EVENTS, GAME_STATUSES, MOVING_DIRECTIONS } from './constants.js';

const eventSource = new EventSource('http://localhost:7000/events');

eventSource.addEventListener('message', (eventSourceEvent) => {
    const event = JSON.parse(eventSourceEvent.data);
    _notifyObservers(event.name, event.payload);
});

let _observers = [];

export const subscribe = (observer) => {
    _observers.push(observer);
};

export const unsubscribe = (observer) => {
    _observers = _observers.filter((o) => o !== observer);
};

const _notifyObservers = (name, payload = {}) => {
    const samuraiEvent = {
        name,
        payload,
    };

    _observers.forEach((observer) => {
        try {
            observer(samuraiEvent);
        } catch (error) {
            console.error(error);
        }
    });
};

let googleJumpInterval;

// SETTERS

export const start = () => {
    fetch('http://localhost:7000/start');
};

export const playAgain = () => {
    fetch('http://localhost:7000/playAgain');
};

export const movePlayer = async (playerNumber, direction) => {
    const params = new URLSearchParams({ playerNumber, direction });
    fetch(`http://localhost:7000/movePlayer?${params}`);
};

// GETTERS

export const getGooglePoints = async () => {
    const response = await fetch('http://localhost:7000/getGooglePoints');
    const { data } = await response.json();
    return data;
};

export const getPlayerPoints = async (playerNumber) => {
    const params = new URLSearchParams({ playerNumber });
    const response = await fetch(
        `http://localhost:7000/getPlayerPoints?${params}`
    );
    const { data } = await response.json();
    return data;
};

export const getGridSize = async () => {
    const response = await fetch('http://localhost:7000/getGridSize');
    const { data } = await response.json();
    return data;
};

export const getGooglePosition = async () => {
    const response = await fetch('http://localhost:7000/getGooglePosition');
    const { data } = await response.json();
    return data;
};

export const getPlayerPosition = async (playerNumber) => {
    const params = new URLSearchParams({ playerNumber });
    const response = await fetch(
        `http://localhost:7000/getPlayerPosition?${params}`
    );
    const { data } = await response.json();
    return data;
};

export const getGameStatus = async () => {
    const response = await fetch('http://localhost:7000/getGameStatus');
    const { data } = await response.json();
    return data;
};
