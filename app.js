const express = require("express");
const app = express();

const connectDB = require("./db");
const {
  getGoals,
  renderGoals,
  addGoal,
  addGoalEjs,
  renderGoalForm,
} = require("./controller");

//Important: will be discussed next week
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

// SSR
// Route to render index.html with goals using EJS
app.get("/", renderGoals);
// Define a route to render the addgoal.ejs view
app.get("/addgoal", renderGoalForm);
// Route to add  goal using EJS
app.post("/addgoal", addGoalEjs);

// API
// GET all Goals
app.get("/api/goals", getGoals);
// POST a new Goal
app.post("/api/goals", addGoal);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});