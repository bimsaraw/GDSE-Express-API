import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import UserController from './controllers/UserController';
import bodyParser from 'body-parser';

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Application is running");
});

mongoose.connect('mongodb://localhost:27017/gdse-db');

app.use("/api", UserController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})