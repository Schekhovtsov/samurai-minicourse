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
