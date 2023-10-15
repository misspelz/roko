require("dotenv").config();
const path = require("path");
const {userDB, paymentDB} = require("./config/databases/rokoDatabase");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const authRoute = require("./routes/users_auth/auth");
const subscribeRoute = require("./routes/payment_service/subPlan");
const contactRoute = require("./routes/contact_service/contact");
const whRoute = require("./routes/payment_service/wh");
const app = express();
const cors = require("cors");
const rateLimiter = require("./middlewares/rateLimit");


// Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.Secret_ID,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      secure: false, // Set to true if your app is running over HTTPS
    },
  })
);
app.use(flash());
// app.use(rateLimiter);
app.use("/auth", authRoute);
app.use("/subscribe", subscribeRoute);
app.use("/wh", whRoute);
app.use("/contact", contactRoute);

const port = process.env.NODE_ENV === "production" ? process.env.PORT : 8000;

app.get("/home(.html)?", (req, res) => {
  if (!req.session.verified) {
    return res.redirect("/");
  }
  res.render("index", { flashMessages: req.flash() });
});

app.get("/", (req, res) => {
  res.render("signin", { flashMessages: req.flash() });
});

app.get("/signup", (req, res) => {
  res.render("signup", { flashMessages: req.flash() });
});

// Catch-all handler should be the last route
app.all("*", (req, res) => {
  res.render("404");
});

// Define an async function to connect to the databases
async function connectToDatabases() {
  const chalk = (await import("chalk")).default;
  try {
    await Promise.all([
      userDB, 
      paymentDB 
    ]);
    console.log(chalk.bgBlack("Roko:: Databases connected successfully"));

    // Start the server only after both databases are connected
    app.listen(port, () => {
      console.log(chalk.yellow(`Server is running on http://localhost:${port}`));
    });
  } catch (error) {
    console.error(chalk.bgRed("Error connecting to databases:", error));
  }
}

// Call the function to connect to the databases
connectToDatabases();

    