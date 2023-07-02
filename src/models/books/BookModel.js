import BookSchema from "./BookSchema.js";

export const addBook = (obj) => {
  return BookSchema(obj).save();
};

export const getBooks = (obj) => {
  return BookSchema.find();
};

export const updateBooks = (obj) => {
  return BookSchema.findByIdAndUpdate();
};
