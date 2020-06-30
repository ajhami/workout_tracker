const router = require("express").Router();
const db = require("./../models");


// Get route to all saved workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkouts => {
            res.json(dbWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// Post route creating a new workout instance
router.post("/api/workouts", (req, res) => {
    db.Workout.create({})
        .then(newWorkout => {
            res.json(newWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// Put route to update new or current workouts with exercise info
router.put("/api/workouts/:id", (req, res) => {
    console.log("PUT ROUTE REACHED!");
    console.log(req.params.id);
    console.log(req.body);
    console.log(req.body.type);
    if (req.body.type === "resistance") {
        db.Workout.findByIdAndUpdate({
            _id: req.params.id
        },
        {
            $set: {
                exercises : [
                    {
                        type: req.body.type,
                        name: req.body.name,
                        duration: req.body.duration,
                        weight: req.body.weight,
                        reps: req.body.reps,
                        sets: req.body.sets
                    }
                ]
            }
        })
            .then(function (addedWorkout) {
                console.log(addedWorkout);
                res.json(addedWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    } else if (req.body.type === "cardio") {
        db.Workout.findByIdAndUpdate({
            // "_id": mongojs.ObjectId(req.params.id)
            "_id": req.params.id
        },
        {
            $set: {
                exercises: [
                    {
                        type: req.body.type,
                        name: req.body.name,
                        duration: req.body.duration,
                        distance: req.body.distance
                    }
                ]
            }
        })
            .then(function (addedWorkout) {
                console.log(addedWorkout);
                res.json(addedWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
});

// Get route to grab weekly data for stats page
router.get("/api/workouts/range", (req, res) => {
    // Setting the range dates upon API call (1 week span)
    var preDate = new Date().setDate(new Date().getDate()-7);
    var currDate = new Date().setDate(new Date().getDate());

    db.Workout.find({
        "day": {
            "$gte": preDate,
            "$lt": currDate
        }
    })
        .then(recentWorkouts => {
            console.log(recentWorkouts);
            res.json(recentWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;