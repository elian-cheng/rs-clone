require("express-async-errors");
const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { StatusCodes } = require("http-status-codes");

const winston = require("./common/logging");
const signinRouter = require("./routes/authentication/signin.router");
const userRouter = require("./routes/users/user.router");
const userTokenRouter = require("./routes/token/token.router");
const statisticRouter = require("./routes/statistics/statistic.router");
const lessonsRouter = require("./routes/lessons/lessons");
const quizRouter = require("./routes/quiz/quiz");
const missingTypeRouter = require("./routes/missingType/missingType");
const errorHandler = require("./errors/errorHandler");
const checkAuthentication = require("./routes/authentication/checkAuthentication");
const { userIdValidator } = require("./utils/validation/validator");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(checkAuthentication);

app.use("/", (req, res, next) => {
  if (req.originalUrl === "/") {
    res.send("Service is running!");
    return;
  }
  next();
});

app.use(
  morgan(
    ":method :status :url :userId size req :req[content-length] res :res[content-length] - :response-time ms",
    {
      stream: winston.stream
    }
  )
);

app.use("/signin", signinRouter);

app.use("/users", userRouter);

app.use("/lessons", lessonsRouter);

app.use("/quiz", quizRouter);

app.use("/missing-type", missingTypeRouter);

userRouter.use("/:id/tokens", userIdValidator, userTokenRouter);

userRouter.use("/:id/statistics", userIdValidator, statisticRouter);

app.use((req, res, next) => next(createError(StatusCodes.NOT_FOUND)));

app.use(errorHandler);

module.exports = app;

