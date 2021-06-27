const mongoose = require("../db/db");
const schema = mongoose.Schema;
//mongoose.set("useFindAndModify", false);
const superlistcontent = new schema(
  {
    actualmovietitle: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("superlistcontent", superlistcontent);
