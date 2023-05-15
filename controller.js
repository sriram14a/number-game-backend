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
  return await client.db("guessing-game").collection("user").find({ }).toArray();
}

export async function updateUser(name, guess) {
  return await client
    .db("guessing-game")
    .collection("user")
    .updateOne({ name: name }, { $set: { guess: guess } });
}
