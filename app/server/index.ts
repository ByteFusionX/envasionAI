// Import the express in typescript file
import express from 'express';

//Import the cors in typescript file
import cors from 'cors'

import router from './routes/user-router';

import dotenv from "dotenv";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as http from 'http';

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 3000;

// Handling '/' Request
app.get('/', (_req, _res) => {
	_res.send("TypeScript With Express");
});

// Server setup
app.listen(port, () => {
	console.log("server running..");
});

dotenv.config();

app.use(express.json());

app.use(
	cors({
		credentials: true,
		origin: [process.env.ORIGIN1 as string],
	})
);

app.use("/", router);

mongoose
	.connect(process.env.MONGODB_URL as string)
	.then(() => {

		console.log("Database connected and Working  ");
	});


