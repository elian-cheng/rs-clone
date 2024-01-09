const express = require("express");
const router = express.Router();
const path = require("path");
const { readFileSync } = require("fs");

router.use(logger);

const MISSING_TYPE_DB = process.env.MISSING_TYPE_DB || path.resolve(__dirname, "missingType.json");

router.get("/", (req, res) => {
  const queryParams = {};
  const [uri, query] = req.url.split("?");

  if (query) {
    for (const piece of query.split("&")) {
      const [key, value] = piece.split("=");
      queryParams[key] = value ? decodeURIComponent(value) : "";
    }
  }
  res.send(getMissingTypeList(queryParams));
});

router.get("/:id", (req, res) => {
  res.send(getMissingType(`${req.params.id}`));
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

function getMissingTypeList(params = {}) {
  const missingType = shuffle(JSON.parse(readFileSync(MISSING_TYPE_DB) || "[]"));

  let data = missingType;

  // if (params.difficulty) {
  //   const difficulty = params.difficulty.trim().toLowerCase();
  //   const regExp = new RegExp(`^${difficulty}$`);
  //   data = data.filter(item => regExp.test(item.difficulty.toLowerCase()));
  // }

  if (params.list) {
    const list = params.list.split(",");
    data = data.filter(item => list.includes(item.id));
  }

  return data;
}

function getMissingType(itemId) {
  const missingType = JSON.parse(readFileSync(MISSING_TYPE_DB) || "[]");
  const item = missingType.find(({ id }) => id === +itemId);
  if (!item) throw new ApiError(404, { message: "Item Not Found" });
  return item;
}

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

module.exports = router;
