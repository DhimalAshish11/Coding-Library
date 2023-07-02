import express from "express";
import { addBook, getBooks, updateBooks } from "../models/books/BookModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await addBook(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New book has been added",
        })
      : res.json({
          status: "error",
          message: "Error, unable to add the book, try again later",
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
    const books = await getBooks();
    res.json({
      status: "success",
      message: "book list",
      books,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const { __v, _d, ...rest } = req.body;
    const result = await updateBooks(req.body);

    result?._id
      ? res.json({
          status: "success",
          message: "New book has been updated succesfully",
        })
      : res.json({
          status: "error",
          message: "Error, unable to update the book, try again later",
        });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const books = await deleteBooks(_id);
    res.json({
      status: "success",
      message: "The book has been deleted",
      books,
    });
  } catch (error) {
    res.json({
      status: "error",
      message: "unable to delete book",
    });
  }
});

export default router;
