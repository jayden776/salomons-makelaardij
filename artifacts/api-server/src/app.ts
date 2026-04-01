import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const publicDir = path.resolve(process.cwd(), "dist/public");
app.use(express.static(publicDir));

app.use((_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

export default app;
