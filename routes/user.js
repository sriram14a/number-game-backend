import express from "express";
import { createUser, getUser, createWinner, getWinner } from "../controller.js";
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

router.post("/winner", async (req, res) => {
  const { name, guess } = req.body;
  const oldUser = await getUser(name);

  if (oldUser) {
    await createWinner(name, guess);
  }
});

router.get("/winner", async (req, res) => {
  try {
    const winner = await getWinner(req);

    res.send(winner);
  } catch (err) {
    console.log(err);
  }
});

export const usersRouter = router;
