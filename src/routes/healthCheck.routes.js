import {Router} from "express";
import { healthCheck } from "../controllers/healthCheck.controller.js";

const healthCheckRouter = Router();


//  -----------------------
//  health check ka home route h ye , mota mota sb check krega ye
healthCheckRouter.route("/").get(healthCheck);

export {healthCheckRouter};
