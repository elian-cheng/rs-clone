const express = require("express");
const router = express.Router();
const path = require("path");
const { readFileSync } = require("fs");

router.use(logger);

const LESSONS_DB = process.env.LESSONS_DB || path.resolve(__dirname, "lessons.json");
const LESSONS_PREFIX = "/lessons";

router.get("/", (req, res) => {
  const queryParams = {};
  const [uri, query] = req.url.substring(LESSONS_PREFIX.length).split("?");

  if (query) {
    for (const piece of query.split("&")) {
      const [key, value] = piece.split("=");
      queryParams[key] = value ? decodeURIComponent(value) : "";
    }
  }
  res.send(getLessonsList(queryParams));
});

router.get("/:id", (req, res) => {
  res.send(getLessons(`${req.params.id}`));
});

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

function getLessonsList(params = {}) {
  const lessons = JSON.parse(readFileSync(LESSONS_DB) || "[]");

  let data = lessons;

  if (params.theme) {
    const theme = params.theme.trim().toLowerCase();
    const regExp = new RegExp(`^${theme}$`);
    data = data.filter(item => regExp.test(item.theme.toLowerCase()));
  }

  if (params.list) {
    const list = params.list.split(",");
    data = data.filter(item => list.includes(item.id));
  }

  return data;
}

function getLessons(itemId) {
  const lessons = JSON.parse(readFileSync(LESSONS_DB) || "[]");
  const item = lessons.find(({ id }) => id === +itemId);
  if (!item) throw new ApiError(404, { message: "Item Not Found" });
  return item;
}

module.exports = router;
