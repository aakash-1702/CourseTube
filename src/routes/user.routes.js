import { Router } from "express";
const router = Router();
import { createUser } from "../controllers/users.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  createUser
);

export { router };
