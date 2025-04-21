const express = require("express");

const postsRoutes = require("./routes/postsRoutes");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middlewares/authMiddleware");

require("dotenv").config();

const path = require("path");
const ejs = require("ejs");


//define app and the port
const app = express();
const PORT = 8000;


mongoose.connect("mongodb://localhost:27017/annapurna", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// configration for ejs and public
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, "public")));


app.use("/", authRoutes);
app.use("/donate",authMiddleware,postsRoutes)


app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
