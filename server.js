const express = require("express");
const redis = require("redis");
const { Pool } = require("pg");
const now = require("performance-now");

const app = express();
const port = process.env.PORT || 3000;

const pgPool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "mysecretpassword",
  port: 5432,
});

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error: ${error}`));

  await redisClient.connect();
})();

async function fetchDbData(id) {
  const start = now();
  const { rows } = await pgPool.query("SELECT * FROM alunos WHERE id = $1", [id]);
  const end = now();
  console.log(`DB query took ${(end - start).toFixed(2)} milliseconds`);
  return rows[0];
}

async function cacheData(req, res, next) {
  const alunoId = req.params.id;
  let results;
  try {
    const start = now();
    const cacheResults = await redisClient.get(alunoId);
    const end = now();
    console.log(`Cache read took ${(end - start).toFixed(2)} milliseconds`);

    if (cacheResults) {
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: true,
        data: results,
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getAlunoData(req, res) {
  const alunoId = req.params.id;
  let results;

  try {
    const dbData = await fetchDbData(alunoId);

    const start = now();
    await redisClient.set(alunoId, JSON.stringify(dbData), {
      EX: 180,
      NX: true,
    });
    const end = now();
    console.log(`Cache write took ${(end - start).toFixed(2)} milliseconds`);

    res.send({
      fromCache: false,
      data: dbData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

app.get("/aluno/:id", cacheData, getAlunoData);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
