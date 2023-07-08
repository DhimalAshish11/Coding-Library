import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: "inactive",
  },

  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  dueDate: {
    type: Date,
    default: null,
  },
  returnDate: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("Books", BookSchema); //users
