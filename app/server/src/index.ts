import express from 'express';
import cors from 'cors'
import router from './routes/user-router';
import dotenv from "dotenv";
import * as path from 'path';
import mongoose from 'mongoose';

const app: express.Application = express();

const port: number = 3000;

app.listen(port, () => {
	console.log("server running..");
});

dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(
	cors({
		credentials: true,
		origin: [process.env.ORIGIN1 as string],
	})
);

app.use((req, res, next) => {
	if (req.originalUrl.includes('/webhook')) {
		next();
	} else {
		express.json({ limit: "1mb" })(req, res, next);
	}
});

app.use('/', router);

mongoose
	.connect(process.env.MONGODB_URL as string)
	.then(() => {

		console.log("Database connected and Working  ");
	});


