const mongoose = require("../db/db");
const schema = mongoose.Schema;
//mongoose.set("useFindAndModify", false);
const supermovielist = new schema(
  {
    actualmovietitle: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("supermovielist", supermovielist);
