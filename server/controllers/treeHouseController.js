const db = require("../models");

// Defining methods for the treeHouse Controller
module.exports = {
  find: function (req, res) {
    console.log('here')
    console.log(req.params)
    db.TreeHouse
      .find({ users: req.params.id})
      // .populate("treeHouse")
      .populate('users', 'name')
      .sort({ date: 1 })
      .then(dbTreeHouses => {
        res.json(dbTreeHouses)
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
    db.TreeHouse
      .findById(req.params.id)
      .populate("controller")
      .populate("user")
      .populate("users")
      .populate('pending')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    // console.log(req.body)
    db.TreeHouse
      .create(req.body)
      .then(({ _id }) => db.User.findOneAndUpdate({ _id: req.body.controller }, { $push: { treeHouses: _id } }, { new: true }))
      .then(dbUser => {
        res.json(dbUser);
        // console.log("I got here 40")
      })
      .catch(err => {
        res.json(err);
      });

  },
  update: function (req, res) {
    db.TreeHouse
      .findOneAndUpdate({ _id: req.params.id }, {$push: {houses: req.body}})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    // console.log(req.body)
    db.TreeHouse
      .updateOne(
        {_id: req.body.id},
        {$pull: {"houses": { _id: req.body.houseId }}}
        )
      // .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeClub: function (req, res) {
    db.TreeHouse
      .findById(req.params.id)
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
};
