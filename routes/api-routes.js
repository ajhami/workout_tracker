const router = require("express").Router();
const db = require("./../models");
// const mongojs = require("mongojs");

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
});

router.post("/api/workouts", (req, res) => {
    console.log("creating new workout");

    db.Workout.create({
        // day: Date.now(),
        // exercises: []
    })
        .then(newWorkout => {
            res.json(newWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

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

                // "exercises.$type": req.body.type,
                // "exercises.$name": req.body.name,
                // "exercises.$duration": req.body.duration,
                // "exercises.$weight": req.body.weight,
                // "exercises.$reps": req.body.reps,
                // "exercises.$sets": req.body.sets
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
            "$set": {
                "exercises.$type": req.body.type,
                "exercises.$name": req.body.name,
                "exercises.$duration": req.body.duration,
                "exercises.$distance": req.body.distance
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

router.get("/api/workouts/range", (req, res) => {
    console.log("/api/workouts/range found!");
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