const logger = require("./common/logging");

process.on("unhandledRejection", reason => {
  process.emit("uncaughtException", reason);
});

const mongoose = require("mongoose");
const { PORT, MONGO_CONNECTION_STRING } = require("./common/config");
const app = require("./app");

mongoose.set("strictQuery", false);

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => logger.error("MongoDB connection error:")).once("open", () => {
  logger.info("Successfully connect to DB");
  app.listen(PORT, () => logger.info(`App is running on http://localhost:${PORT}`));
  logger.info("Нажмите CTRL+C, чтобы остановить сервер");
  logger.info("GET /lessons - получить список уроков");
  logger.info("GET /lessons/${id} - получить урок по его ID");
  logger.info("GET /lessons?theme=${theme} - получить уроки по темам ${theme}");
  logger.info("GET /quiz - получить список тестов");
  logger.info("GET /quiz/${id} - получить тест по его ID");
  logger.info("GET /quiz?difficulty=${difficulty} - получить тесты по сложности ${difficulty}");
  logger.info("GET /missing-type - получить список вопросов для игры Missing Type");
  logger.info("GET /missing-type/${id} - получить вопрос для Missing Type по его ID");
  logger.info("GET /users/${id}/tokens - получить токен доступа пользователя");
  logger.info("POST /users - создать(зарегистрировать) пользователя");
  logger.info("POST /signin - залогинить пользователя");
  logger.info("GET users/${userID}/statistics - получить статистику пользователя");
  logger.info("PUT users/${userID}/statistics - отправить статистику пользователя на сервер");
});

