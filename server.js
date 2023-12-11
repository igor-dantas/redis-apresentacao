const express = require("express");
const axios = require("axios");
const redis = require("redis");
const now = require("performance-now");

const app = express();
const port = process.env.PORT || 3000;

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error: ${error}`));

  await redisClient.connect();
})();

async function fetchApiData(species) {
  const start = now();
  const apiResponse = await axios.get(
    `https://www.fishwatch.gov/api/species/${species}`
  );
  const end = now();
  console.log(`API request took ${(end - start).toFixed(2)} milliseconds`);
  return apiResponse.data;
}

async function cacheData(req, res, next) {
  const species = req.params.species;
  let results;
  try {
    const start = now();
    const cacheResults = await redisClient.get(species);
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
    res.status(404);
  }
}

async function getSpeciesData(req, res) {
  const species = req.params.species;
  let results;

  try {
    const apiData = await fetchApiData(species);

    const start = now();
    await redisClient.set(species, JSON.stringify(apiData), {
      EX: 180,
      NX: true,
    });
    const end = now();
    console.log(`Cache write took ${(end - start).toFixed(2)} milliseconds`);

    res.send({
      fromCache: false,
      data: apiData,
    });
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}

app.get("/fish/:species", cacheData, getSpeciesData);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
