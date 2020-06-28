const router = require("express").Router();
const db = require("./../models");


// ADD API ROUTES HERE


router.get("/api/workouts", (req, res) => {
    console.log("/api/workouts found!");
    db.Workout.find({})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})



module.exports = router;