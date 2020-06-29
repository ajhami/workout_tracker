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
        db.Workout.update({
            // "_id": mongojs.ObjectId(req.params.id)
            "_id": req.params.id
        },
        {
            "$set": {
                "exercises.$type": req.body.type,
                "exercises.$name": req.body.name,
                "exercises.$duration": req.body.duration,
                "exercises.$weight": req.body.weight,
                "exercises.$reps": req.body.reps,
                "exercises.$sets": req.body.sets
            }
        })
            .then(function (addedWorkout) {
                res.json(addedWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    } else if (req.body.type === "cardio") {
        db.Workout.update({
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
                res.json(addedWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    }
});

router.get("/api/workouts/range", (req, res) => {
    console.log("/api/workouts/range found!");
    db.Workout.find({
        "day": {
            "$gte": new Date().setDate(new Date().getDate()-7),
            "$lt": new Date().setDate(new Date().getDate())
        }
    })
        .then(recentWorkouts => {
            res.json(recentWorkouts);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;