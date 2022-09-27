import express from 'express';
import bodyParser from 'body-parser';
import routers from 'api';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
const { xss } = require('express-xss-sanitizer');

// require('dotenv').config()
// rest of the code remains same
const app = express();

// cookie parser
app.use(cookieParser());
// configuring CORS
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// import 'databases';

app.use(xss());

// init route
app.use(routers);

export default app;
