const db = require("../models");

// Defining methods for the feedbackController
module.exports = {
    findAll: function (req, res) {
        db.FeedBack
            .find({})
        console.log(req.query)
        console.log('here')
            .populate("user")
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.FeedBack
            .create(req.body)
            .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.body.user }, { $push: { feedback: _id } }, { new: true }))
            .then(dbUser => {
                res.json(dbUser);
            })
            .catch(err => {
                res.json(err);
            });

    },
    update: function (req, res) {
        db.FeedBack
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.FeedBack
            .findById(req.params.id)
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};
