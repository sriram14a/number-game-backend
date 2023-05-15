import { client } from "./index.js";

export async function createUser(name, arr) {
  return await client.db("guessing-game").collection("user").insertOne({
    name: name,
    random: arr,
  });
}

export async function getUser(name) {
  return await client.db("guessing-game").collection("user").findOne({
    name: name,
  });
}

export async function getWinner(req) {
  return await client.db("guessing-game").collection("winner").find(req.query).toArray();
}

export async function createWinner(name, guess) {
  return await client
    .db("guessing-game")
    .collection("winner")
    .insertOne({  name: name,
      guess: guess, });
}
