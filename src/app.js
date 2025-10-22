import express from 'express';

// routes for healthCheck of the system
import {healthCheckRouter} from "./routes/healthCheck.routes.js";
import cookieParser from 'cookie-parser';
import { router } from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(cookieParser());




// ---------------Creating new User 
app.use("/api/v1/users",router);



// ----------------------------------------------


app.use('/api/v1/healthCheck',healthCheckRouter);



//  ------------------------------------------------


export {app};