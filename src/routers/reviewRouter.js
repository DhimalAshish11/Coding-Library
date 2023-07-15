import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { addReview, getReviews } from "../models/review/ReviewModel.js";
import { updateBurrow } from "../models/burrow/BurrowModel.js";
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    console.log(req.body);

    const result = await addReview(req.body);

    if (result?._id) {
      //update burrow history
      await updateBurrow(req.body.burrowHistoryId, {
        reviewGiven: result?._id,
      });

      return res.json({
        status: "success",
        message: "Your review has been recieved.",
      });
    }

    res.json({
      status: "error",
      message: "Unable to receive your review, try again later.",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await getReviews();

    res.json({
      status: "success",
      message: "here are the lists",
      reviews,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

export default router;
