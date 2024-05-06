import express, { Request, Response } from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import subRoutes from "./routes/subs";
import postRoutes from "./routes/posts";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const origin = "http://localhost:3000";
app.use(
  cors({
    origin, //3000번 포트 허용
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

dotenv.config(); //env파일 쓰기 위해 설정

app.get("/", (_: Request, res: Response) => res.send("running"));
app.use("/api/auth", authRoutes);
app.use("/api/subs", subRoutes);
app.use("/api/posts", postRoutes);

app.use(express.static("public"));

let port = 4000;
app.listen(port, async () => {
  console.log(`server running at http://localhost:${port}`);

  AppDataSource.initialize()
    .then(() => {
      console.log("database initialized");
    })
    .catch((error) => console.log(error));
});
