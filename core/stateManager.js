const _state = {
    settings: {
        gridSize: {
            rowsCount: 3,
            columnsCount: 3,
        },
    },
    points: {
        google: 50,
        players: [100, 200], // Массив очков игроков
    },
};

export const getGooglePoints = async () => _state.points.google;

/**
 * Возвращает очки игрока по его номеру.
 *
 * @param {number} playerNumber - Номер игрока (с отсчетом от 1).
 * @return {Promise<number>} Очки игрока.
 */
export const getPlayerPoints = async (playerNumber) => {
    const playerIndex = playerNumber - 1;

    if (playerIndex < 0 || playerIndex > _state.points.players.length - 1) {
        throw new Error(
            'Игрок c номером ' +
                playerNumber +
                ' не найден. Невозможно получить очки'
        );
    }

    return _state.points.players[playerIndex];
};

// Возвращаем новый объект чтобы исключить изменение снаружи
export const getGridSize = async () => ({ ..._state.settings.gridSize });
