const _state = {
    points: {
        google: 50,
        players: [100, 200], // Массив очков игроков
    },
};

export const getGooglePoints = () => _state.points.google;

/**
 * Возвращает очки игрока по его номеру.
 *
 * @param {number} playerNumber - Номер игрока (с отсчетом от 1).
 * @return {number} Очки игрока.
 */
export const getPlayerPoints = (playerNumber) => {
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
