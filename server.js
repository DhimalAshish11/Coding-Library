import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 8000;

//CONNECT DATABASE

import connectMongoDB from "./src/config/mongoConfig.js";
connectMongoDB();

//middleware

app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

///APIS

import useRouter from "./src/routers/userRouter.js";
import bookRouter from "./src/routers/bookRouter.js";
import burrowRouter from "./src/routers/burrowRouter.js";
app.use("/api/v1/user", useRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/burrow", burrowRouter);

/* app.use("/api/v1/user", (req, res) => {
  res.json({
    status: "sucesss",
    message: "Sever running well",
  });
}); */

app.use("/", (req, res) => {
  res.json({
    status: "sucesss",
    message: "Sever running well",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server running at http://localhost:${PORT}`);
});
