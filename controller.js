const Goal = require("./model");

// Render Controller: Render index.html with goals using EJS
const renderGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.render("index", { goals }); // Render index.ejs with goals data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// get all Goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

const renderGoalForm = (req, res) => {
  res.render("addgoal"); // Assuming "addgoal.ejs" is located in the "views" directory
};

// Controller function to handle adding a new goal (used for rendering and API)
const addGoalEjs = async (req, res) => {
  try {
    const { title, description, targetDate } = req.body;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "true";
    const newGoal = new Goal({ title, description, targetDate, achieved });
    await newGoal.save();
    // Redirect to the main page after successfully adding the goal
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Goal
const addGoal = async (req, res) => {
  try {
    const { title, description, targetDate, achieved } = req.body;
    const newGoal = new Goal({ title, description, targetDate, achieved });
    await newGoal.save();

    // Render the newly added goal
    res.render("goal", { goal: newGoal });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Goal by ID
const getGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Goal by ID
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findByIdAndDelete({ _id: id });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Goals
const deleteAllGoals = async (req, res) => {
  try {
    const result = await Goal.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Goal by ID
const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGoal = req.body;
    const goal = await Goal.findOneAndUpdate({ _id: id }, updatedGoal);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getGoals,
  renderGoals,
  addGoal,
  addGoalEjs,
  renderGoalForm,
  getGoal,
  deleteGoal,
  deleteAllGoals,
  updateGoal,
};