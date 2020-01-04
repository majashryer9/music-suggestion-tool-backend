import dotenv from 'dotenv';
dotenv.config();
import { connectToMongo } from './util/mongo-util';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { playlistRouter } from './routers/playlist-router';

connectToMongo();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/playlist', playlistRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Application is listening on port ${port}`);
});