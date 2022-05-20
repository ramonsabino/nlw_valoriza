import "reflect-metadata";
import express, { response } from "express";
import "./database";
import { router } from "./routes/routes";
import { Response, Request, NextFunction } from "express";
import "express-async-errors";
const app = express();

const port = 3000;

app.use(express.json());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response
    .status(500)
    .json({ status: "error", message: "Interal Server Error" });
});

app.listen(port, () => {
  console.log(`Rodando na ${port}`);
});
