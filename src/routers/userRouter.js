import express from "express";
import { hashPassword } from "../utils/bcrypt.js";

import { insertUser } from "../models/user/UserModel.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    console.log(req.body);

    res.json({
      status: "sucess",
      message: "Here are the user information",
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { password } = req.body;

    req.body.password = hashPassword(password);

    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "New user has been created successfull",
        })
      : res.json({
          status: "error",
          message: "Unable to craete user, try again later",
        });
  } catch (error) {
    let msg = error.message;

    if (msg.includes("E11000 duplicate key error")) {
      msg = "Ther is another user who uses this email in the system";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});

export default router;
