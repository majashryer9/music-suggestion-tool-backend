import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 8080;

app.listen(() => {
    console.log(`Application is listening on port ${port}`);
});