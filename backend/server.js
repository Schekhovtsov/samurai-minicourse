import express from 'express';
import {
    start,
    getGameStatus,
    getGooglePosition,
    playAgain,
} from '../core/stateManager.js';

const app = express();
const port = 7000;

app.get('/start', async (req, res) => {
    await start();
    res.send(200);
});

app.get('/playAgain', async (req, res) => {
    await playAgain();
    res.send(200);
});

app.get('/', async (req, res) => {
    const gameStatus = await getGameStatus();
    res.send(gameStatus);
});

app.get('/getGooglePosition', async (req, res) => {
    const googlePosition = await getGooglePosition();
    res.send(googlePosition);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
