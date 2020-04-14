const db = require("../models");

// Defining methods for the charactersController
module.exports = {
  find: function (req, res) {
    console.log('here')
    console.log(req.params)
    db.User
      .findById(req.params.id)
      .populate("characters")
      .sort({ date: 1 })
      .then(dbUser => {
        res.json(dbUser)
      })
      .catch(err => {
        res.json(err);
      });

    // db.Character
    //   .find(req.query)
    //   .sort({ date: -1 })
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Character
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Character
      .create(req.body)
      .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.body.user }, { $push: { characters: _id } }, { new: true }))
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });

  },
  update: function (req, res) {
    db.Character
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Character
      .findById(req.params.id)
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
