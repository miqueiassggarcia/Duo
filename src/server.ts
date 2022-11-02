import express from "express";
import Usuario from "./Usuario";

let user: Usuario = new Usuario("carlos", "M", "eu@email.com");

const app = express();

app.get("/ads", (request, response) => {
  return response.json([
    { id: 1, name: user.getnome() },
    { id: 2, name: "Post 2" },
  ])
})

app.get('/', (req, res) => {
  res.send("Esse tal de fabio é gay^2");
})

app.listen(3333);