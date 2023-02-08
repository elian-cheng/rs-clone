const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { addMethods } = require("../../utils/toResponse");

const StatisticSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: false
    },
    lessons: {
      type: Object,
      required: false
    },
    katas: {
      type: Object,
      required: false
    },
    longStat: {
      type: Object,
      required: false
    },
    games: {
      type: Object,
      required: false
    }
  },
  { collection: "statistic" }
);

addMethods(StatisticSchema);

module.exports = mongoose.model("Statistic", StatisticSchema);

