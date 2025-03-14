 import express from "express";
 import http from "http";
 import cors from 'cors';
 import bodyParser from 'body-parser';
 import config from "./Config/index.js";

import api from './api/index.js';

 const app = express();
 const httpServer = http.createServer(app);

 app.use(cors());

 app.use(
    bodyParser.urlencoded({
      extended: false,
      parameterLimit: 10000,
      limit: 1024 * 1024 * 10,
    })
  );

app.use(bodyParser.json());

 app.use('/api', api);
 httpServer.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
 });

 


