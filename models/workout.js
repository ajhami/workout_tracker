const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    // A test variable to the workout schema
    test: String
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;