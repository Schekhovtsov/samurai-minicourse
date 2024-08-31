import { EVENTS, GAME_STATUSES, MOVING_DIRECTIONS } from './constants.js';

const _state = {
    gameStatus: GAME_STATUSES.SETTINGS,
    settings: {
        gridSize: {
            rowsCount: 4,
            columnsCount: 4,
        },
        googleJumpInterval: 3000,
        pointsToLose: 10,
        pointsToWin: 3,
    },
    points: {
        google: 0,
        players: [0, 0],
    },
    positions: {
        google: {
            x: 1,
            y: 2,
        },
        players: [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
        ],
    },
};

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

const _generateNewIntegerNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const _jumpGoogleToNewPosition = () => {
    const newPosition = {
        ..._state.points.google,
    };

    do {
        newPosition.x = _generateNewIntegerNumber(
            0,
            _state.settings.gridSize.columnsCount - 1
        );
        newPosition.y = _generateNewIntegerNumber(
            0,
            _state.settings.gridSize.rowsCount - 1
        );
    } while (
        _isPositionMatchWithPlayer1(newPosition) ||
        _isPositionMatchWithPlayer2(newPosition) ||
        _isPositionMatchWithGoogle(newPosition)
    );

    _state.positions.google = newPosition;
};

const _isPositionInValidRange = (position) => {
    if (position.x < 0 || position.x >= _state.settings.gridSize.columnsCount) {
        return false;
    }

    if (position.y < 0 || position.y >= _state.settings.gridSize.rowsCount) {
        return false;
    }

    return true;
};

const _isPositionMatchWithPlayer1 = (newPosition) => {
    return (
        newPosition.x === _state.positions.players[0].x &&
        newPosition.y === _state.positions.players[0].y
    );
};

const _isPositionMatchWithPlayer2 = (newPosition) => {
    return (
        newPosition.x === _state.positions.players[1].x &&
        newPosition.y === _state.positions.players[1].y
    );
};

const _isPositionMatchWithGoogle = (newPosition) => {
    return (
        newPosition.x === _state.positions.google.x &&
        newPosition.y === _state.positions.google.y
    );
};

const _catchGoogle = (playerNumber) => {
    const playerIndex = getPlayerIndexByNumber(playerNumber);

    _state.points.players[playerIndex]++;
    _notifyObservers(EVENTS.SCORES_CHANGED);

    if (_state.points.players[playerIndex] === _state.settings.pointsToWin) {
        _state.gameStatus = GAME_STATUSES.WIN;
        _notifyObservers(EVENTS.STATUS_CHANGED, {
            gameStatus: _state.gameStatus,
        });

        clearInterval(googleJumpInterval);
    } else {
        const prevPosition = _state.positions.google;

        _jumpGoogleToNewPosition();
        _notifyObservers(EVENTS.GOOGLE_JUMPED, {
            prevPosition,
            newPosition: _state.positions.google,
        });
    }
};

let googleJumpInterval;

// SETTERS

export const start = async () => {
    if (_state.gameStatus !== GAME_STATUSES.SETTINGS) {
        throw new Error(
            'Некорректный переход между состояниями игры из ' +
                _state.gameStatus
        );
    }

    _state.positions.players[0] = { x: 0, y: 0 };
    _state.positions.players[1] = {
        x: _state.settings.gridSize.columnsCount - 1,
        y: _state.settings.gridSize.rowsCount - 1,
    };
    _state.points.google = 0;
    _state.points.players = [0, 0];

    _jumpGoogleToNewPosition();

    googleJumpInterval = setInterval(() => {
        const prevPosition = { ..._state.positions.google };
        _jumpGoogleToNewPosition();
        _notifyObservers(EVENTS.GOOGLE_JUMPED, {
            prevPosition,
            newPosition: { ..._state.positions.google },
        });

        _state.points.google++;
        _notifyObservers(EVENTS.SCORES_CHANGED);

        if (_state.points.google >= _state.settings.pointsToLose) {
            clearInterval(googleJumpInterval);
            _state.gameStatus = GAME_STATUSES.LOSE;
            _notifyObservers(EVENTS.STATUS_CHANGED);
        }
    }, _state.settings.googleJumpInterval);

    _state.gameStatus = GAME_STATUSES.IN_PROGRESS;
    _notifyObservers(EVENTS.STATUS_CHANGED);
};

export const playAgain = () => {
    _state.gameStatus = GAME_STATUSES.SETTINGS;
    _notifyObservers(EVENTS.STATUS_CHANGED);
};

export const movePlayer = async (playerNumber, direction) => {
    if (_state.gameStatus !== GAME_STATUSES.IN_PROGRESS) {
        return;
    }

    const playerIndex = getPlayerIndexByNumber(playerNumber);

    const prevPosition = { ..._state.positions.players[playerIndex] };
    const newPosition = { ..._state.positions.players[playerIndex] };

    switch (direction) {
        case MOVING_DIRECTIONS.UP: {
            newPosition.y--;
            break;
        }
        case MOVING_DIRECTIONS.DOWN: {
            newPosition.y++;
            break;
        }
        case MOVING_DIRECTIONS.LEFT: {
            newPosition.x--;
            break;
        }
        case MOVING_DIRECTIONS.RIGHT: {
            newPosition.x++;
            break;
        }
    }

    const isValidRange = _isPositionInValidRange(newPosition);

    if (!isValidRange) {
        return;
    }

    const isPlayer1PositionTheSame = _isPositionMatchWithPlayer1(newPosition);
    if (isPlayer1PositionTheSame) {
        return;
    }

    const isPlayer2PositionTheSame = _isPositionMatchWithPlayer2(newPosition);
    if (isPlayer2PositionTheSame) {
        return;
    }

    const isGooglePositionTheSame = _isPositionMatchWithGoogle(newPosition);

    if (isGooglePositionTheSame) {
        _catchGoogle(playerNumber);
    }

    _state.positions.players[playerIndex] = newPosition;
    _notifyObservers(EVENTS[`PLAYER${playerNumber}_MOVED`], {
        prevPosition,
        newPosition: newPosition,
    });
};

// GETTERS

const getPlayerIndexByNumber = (playerNumber) => {
    const playerIndex = playerNumber - 1;

    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        throw new Error('Игрок c номером ' + playerNumber + ' не найден');
    }

    return playerIndex;
};

export const getGooglePoints = async () => _state.points.google;

/**
 * Возвращает очки игрока по его номеру.
 *
 * @param {number} playerNumber - Номер игрока (с отсчетом от 1).
 * @return {Promise<number>} Очки игрока.
 */
export const getPlayerPoints = async (playerNumber) => {
    const playerIndex = getPlayerIndexByNumber(playerNumber);
    return _state.points.players[playerIndex];
};

export const getGridSize = async () => ({ ..._state.settings.gridSize });

export const getGooglePosition = async () => ({ ..._state.positions.google });

/**
 * Возвращает позицию игрока по его номеру.
 *
 * @param {number} playerNumber - Номер игрока (начиная с 1).
 * @return {object} Позиция игрока в виде объекта с координатами x и y.
 */
export const getPlayerPositions = async (playerNumber) => {
    const playerIndex = getPlayerIndexByNumber(playerNumber);
    return { ..._state.positions.players[playerIndex] };
};

export const getGameStatus = async () => {
    return _state.gameStatus;
};
