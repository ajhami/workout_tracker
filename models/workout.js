const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const workoutSchema = new Schema({
//     // A test variable to the workout schema
//     day: Date,
//     exercises: [{
//         type: {
//             type: {
//                 type: String
//             }
//         },
//         name: String,
//         duration:  Number,
//         distance: Number,
//         weight: Number,
//         reps: Number,
//         sets: Number
//     }]

// });

const workoutSchema = new Schema({
    // A test variable to the workout schema
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            default: "resistance"
        },
        name: String,
        duration:  {
            type: Number,
            default: 1
        },
        distance: {
            type: Number,
            default: 1
        },
        weight: {
            type: Number,
            default: 1
        },
        reps: {
            type: Number,
            default: 1
        },
        sets: {
            type: Number,
            default: 1
        }
    }]

});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;