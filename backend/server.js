import express from 'express';
import cors from 'cors';
import {
    start,
    getGameStatus,
    getGooglePosition,
    playAgain,
    getGridSize,
    getPlayerPoints,
    getGooglePoints,
    getPlayerPosition,
    movePlayer,
    subscribe,
    unsubscribe,
} from '../core/stateManager.js';

const app = express();
const port = 7000;

app.use(cors());

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const observer = (e) => {
        res.write(`data: ${JSON.stringify(e)}\n\n`);
    };

    subscribe(observer);

    req.on('close', () => {
        unsubscribe(observer);
        res.end();
    });
});

app.get('/getGameStatus', async (req, res) => {
    const gameStatus = await getGameStatus();
    res.send({ data: gameStatus });
});

app.get('/start', async (req, res) => {
    await start();
    res.sendStatus(200);
});

app.get('/playAgain', async (req, res) => {
    await playAgain();
    res.sendStatus(200);
});

app.get('/movePlayer', async (req, res) => {
    await movePlayer(req.query.playerNumber, req.query.direction);
    res.sendStatus(200);
});

app.get('/getGooglePosition', async (req, res) => {
    const googlePosition = await getGooglePosition();
    res.send({ data: googlePosition });
});

app.get('/getPlayerPosition', async (req, res) => {
    const playerPosition = await getPlayerPosition(req.query.playerNumber);
    res.send({ data: playerPosition });
});

app.get('/getGridSize', async (req, res) => {
    const gridSize = await getGridSize();
    res.send({ data: gridSize });
});

app.get('/getPlayerPoints', async (req, res) => {
    const playerPoints = await getPlayerPoints(req.query.playerNumber);
    res.send({ data: playerPoints });
});

app.get('/getGooglePoints', async (req, res) => {
    const googlePoints = await getGooglePoints();
    res.send({ data: googlePoints });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
