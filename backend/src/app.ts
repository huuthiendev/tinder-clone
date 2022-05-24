import express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { AppRouting } from './routing';
import * as dotenv from "dotenv";
import { connectDb } from './database'; // initialize database

// Load env
dotenv.config();

const app: Application = express();
const router = express.Router();
const APP_PORT = process.env.APP_PORT || 3333;

app.use(bodyParser.json());
app.use(router);
// Routes
new AppRouting(router);
// Connect Mongodb
connectDb();

app
  .listen(APP_PORT, () => console.log(`Server running on port: ${APP_PORT}`))
  .on('error', (e) => console.error(e));