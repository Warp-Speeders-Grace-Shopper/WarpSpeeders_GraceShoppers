const path = require("path");
const express = require("express");
const morgan = require("morgan");
const User = require("./db/models/User");
const app = express();
module.exports = { app, requireToken };

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// token checking middleware (used in /api)
async function requireToken(req, res, next) {
  try {
    // look up user in db by token and add that to request object (as req.user)
    const token = req.headers.authorization; // get token from headers
    const user = await User.findByToken(token); // look up user in db
    req.user = user; // add user object to request
    next(); // pass it on
  } catch (error) {
    next(error);
  }
}

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));
// any route that uses /api requires a token so we pass that in as callback fn/middleware here

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
