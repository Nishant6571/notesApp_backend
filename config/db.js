const mongoose = require("mongoose");
require("dotenv").config();

// connecting app to the mongo atlas
const connection = mongoose.connect(process.env.mongoURL);

module.exports = { connection };
