import express from "express";
import routeHanlder from './routers';
import passport from './utils/passport';

const app = express();

require("dotenv").config();

app.use(passport.initialize());

app.use(express.json());

app.use(routeHanlder);

app.listen(process.env.APP_PORT, () => {
   console.log("Server up and running on port : ",process.env.APP_PORT);
});

