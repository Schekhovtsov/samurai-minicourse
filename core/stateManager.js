const _state = {
    settings: {
        gridSize: {
            rowsCount: 3,
            columnsCount: 5,
        },
    },
    points: {
        google: 50,
        players: [100, 50], // Массив очков игроков
    },
    positions: {
        google: {
            x: 1,
            y: 2,
        },
        players: [
            { x: 0, y: 0 },
            { x: 2, y: 1 },
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

const _notifyObservers = () => {
    _observers.forEach((observer) => {
        try {
            observer();
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

        var isNewPositionMatchWithCurrentGooglePosition =
            newPosition.x === _state.positions.google.x &&
            newPosition.y === _state.positions.google.y;
        var isNewPositionMatchWithCurrentPlayer1Position =
            newPosition.x === _state.positions.players[0].x &&
            newPosition.y === _state.positions.players[0].y;
        var isNewPositionMatchWithCurrentPlayer2Position =
            newPosition.x === _state.positions.players[1].x &&
            newPosition.y === _state.positions.players[1].y;
    } while (
        isNewPositionMatchWithCurrentGooglePosition ||
        isNewPositionMatchWithCurrentPlayer1Position ||
        isNewPositionMatchWithCurrentPlayer2Position
    );

    _state.positions.google = newPosition;
    _state.points.google++;
};

setInterval(() => {
    _jumpGoogleToNewPosition();
    _notifyObservers();
}, 1000);

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

// Возвращаем новый объект чтобы исключить изменение снаружи
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
    return _state.positions.players[playerIndex];
};
