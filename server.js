const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const db = require("./models");

const PORT = process.env.PORT || 3030;
const app = express();

// Possibly use commented out section for deployment, for now, not relevant
// if (app.get("env") == "production") {
//     app.use(logger("common", {
//         skip: function (req, res) {
//             return res.statusCode < 400
//         },
//         stream: __dirname + "/../morgan.log"
//     }
//     ))
// }

// else {
    app.use(logger("dev"));
// }

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });


// routes
app.use(require("./routes/html-routes.js"));
app.use(require("./routes/api-routes.js"));

app.listen(PORT, () => {
    console.log(`

Welcome to Workout Tracker!
running on port ${PORT}.`);
});