import express from "express";
import { createUser, getUser, updateUser, getWinner } from "../controller.js";
import * as dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/userdetails", async (req, res) => {
  const { name } = req.body;
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  const arr = randomNumber.toString().split("");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      if (arr[i] === "9") {
        arr[i] = parseInt(arr[i]) - 1;
      } else {
        arr[i] = parseInt(arr[i]) + 1;
      }
    }
  }

  const oldUser = await getUser(name);

  if (oldUser) {
    res.send({ message: "username already exist try unique gaming name" });
  } else {
    await createUser(name, arr);
    res.send({ status: "ok" });
  }
});

router.get("/userdetails/:name", async (req, res) => {
  const { name } = req.params;
  const oldUser = await getUser(name);

  if (oldUser) {
    res.send({ data: oldUser });
  }
});

router.post("/userdetails/:name", async (req, res) => {
  const { name } = req.params;
  const { guess } = req.body;
  const oldUser = await getUser(name);

  if (oldUser) {
    await updateUser(name, guess);
  }
});

router.get("/userdetails", async (req, res) => {
  const winner = await getWinner(req);
  res.send({ data: winner });
});

export const usersRouter = router;
