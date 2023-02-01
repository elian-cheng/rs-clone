const { readFileSync } = require("fs");
const { createServer } = require("http");
const path = require("path");

const LESSONS_DB =
  process.env.LESSONS_DB || path.resolve(__dirname, "lessons.json");
const QUIZ_DB = process.env.QUIZ_DB || path.resolve(__dirname, "quiz.json");

const PORT = process.env.PORT || 3024;

const LESSONS_PREFIX = "/lessons";
const QUIZ_PREFIX = "/quiz";

class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

function getLessonsList(params = {}) {
  const lessons = JSON.parse(readFileSync(LESSONS_DB) || "[]");

  let data = lessons;

  if (params.theme) {
    const theme = params.theme.trim().toLowerCase();
    const regExp = new RegExp(`^${theme}$`);
    data = data.filter((item) => regExp.test(item.theme.toLowerCase()));
  }

  if (params.list) {
    const list = params.list.split(",");
    data = data.filter((item) => list.includes(item.id));
  }

  return data;
}

function getLessons(itemId) {
  const lessons = JSON.parse(readFileSync(LESSONS_DB) || "[]");
  const item = lessons.find(({ id }) => id === itemId);
  if (!item) throw new ApiError(404, { message: "Item Not Found" });
  return item;
}

function getQuizList(params = {}) {
  const quiz = JSON.parse(readFileSync(QUIZ_DB) || "[]");

  let data = quiz;

  if (params.difficulty) {
    const difficulty = params.difficulty.trim().toLowerCase();
    const regExp = new RegExp(`^${difficulty}$`);
    data = data.filter((item) => regExp.test(item.difficulty.toLowerCase()));
  }

  if (params.list) {
    const list = params.list.split(",");
    data = data.filter((item) => list.includes(item.id));
  }

  return data;
}

function getQuiz(itemId) {
  const quiz = JSON.parse(readFileSync(QUIZ_DB) || "[]");
  const item = quiz.find(({ id }) => id === itemId);
  if (!item) throw new ApiError(404, { message: "Item Not Found" });
  return item;
}

module.exports = server = createServer(async (req, res) => {
  if (req.url.substring(1, 4) === "img") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    require("fs").readFile(`.${req.url}`, (err, image) => {
      res.end(image);
    });
    return;
  }

  res.setHeader("Content-Type", "application/json");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  if (
    !req.url ||
    (!req.url.startsWith(LESSONS_PREFIX) && !req.url.startsWith(QUIZ_PREFIX))
  ) {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
    return;
  }

  let queryParams = {};
  let [uri, query] = [];

  if (req.url.startsWith(LESSONS_PREFIX)) {
    [uri, query] = req.url.substring(LESSONS_PREFIX.length).split("?");
  } else if (req.url.startsWith(QUIZ_PREFIX)) {
    [uri, query] = req.url.substring(QUIZ_PREFIX.length).split("?");
  }
  if (query) {
    for (const piece of query.split("&")) {
      const [key, value] = piece.split("=");
      queryParams[key] = value ? decodeURIComponent(value) : "";
    }
  }

  try {
    const body = await (async () => {
      if (req.url.startsWith(LESSONS_PREFIX)) {
        if (uri === "" || uri === "/") {
          if (req.method === "GET") return getLessonsList(queryParams);
        } else {
          const itemId = uri.substring(1);
          if (req.method === "GET") return getLessons(itemId);
        }
      } else if (req.url.startsWith(QUIZ_PREFIX)) {
        if (uri === "" || uri === "/") {
          if (req.method === "GET") return getQuizList(queryParams);
        } else {
          const itemId = uri.substring(1);
          if (req.method === "GET") return getQuiz(itemId);
        }
      }
      return null;
    })();
    res.end(JSON.stringify(body));
  } catch (err) {
    console.log("err: ", err);
    if (err instanceof ApiError) {
      res.writeHead(err.statusCode);
      res.end(JSON.stringify(err.data));
    } else {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: "Server Error" }));
    }
  }
})
  .on("listening", () => {
    if (process.env.NODE_ENV !== "test") {
      console.log(
        `Сервер CRM запущен. Вы можете использовать его по адресу http://localhost:${PORT}`
      );
      console.log("Нажмите CTRL+C, чтобы остановить сервер");
      console.log("Доступные методы:");
      console.log(`GET ${LESSONS_PREFIX} - получить список уроков`);
      console.log(`GET ${LESSONS_PREFIX}/{id} - получить урок по его ID`);
      console.log(
        `GET ${LESSONS_PREFIX}?theme={theme} - получить уроки по темам {theme}`
      );
      console.log(`GET ${QUIZ_PREFIX} - получить список тестов`);
      console.log(`GET ${QUIZ_PREFIX}/{id} - получить тест по его ID`);
      console.log(
        `GET ${LESSONS_PREFIX}?difficulty={difficulty} - получить тесты по сложности {difficulty}`
      );
    }
  })
  .listen(PORT);
