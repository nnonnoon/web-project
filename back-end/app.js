import express from "express";
import routeHanlder from './routers';
import passport from './utils/passport';
import cors from 'cors';

const app = express();

require("dotenv").config();

app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.use(passport.initialize());

app.use(express.json());

app.use(routeHanlder);

app.listen(process.env.APP_PORT, () => {
   console.log("Server up and running on port : ",process.env.APP_PORT);
});

