import express from 'express';
// routes for healthCheck of the system
import {healthCheckRouter} from "./routes/healthCheck.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));

// ----------------------------------------------


app.use('/api/v1/healthCheck',healthCheckRouter);



//  ------------------------------------------------


export {app};