const mongoose = require("mongoose");
const MONG_URI =
  "mongodb+srv://agirichandra:u8irAjC9QJxeiT0o@grapghql.hgo40.mongodb.net/?retryWrites=true&w=majority&appName=GrapghQL";
mongoose.connect(MONG_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind("MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected");
});
