const router = require('express').Router()
const Game = require("../models/game")



// Find all
router.get("/", (req, res, next) => {
  Game.find({})
    .then(games => res.json(games))
    .catch(err => next(err))
})

// Find by ID
router.get("/:id", (req, res, next) => {
  Game.findById(req.params.id).then(game => {
    if (game) {
      res.json(game)
    } else {
      throw new NotFoundError()
    }
  }).catch(err => next(err))
})

// Delete one
router.delete("/:id", (req, res, next) => {
  Game.findByIdAndRemove(req.params.id).then(result => {
    if (result) {
      res.json(result)
    } else {
      throw new NotFoundError()
    }
  })
    .catch(err => next(err))
});

// Insert one
router.post("/", (req, res, next) => {
  const body = req.body
  // Check body
  const errorMessages = []
  if (!body.name) errorMessages.push("name must be present")
  if (!body.price) errorMessages.push("price must be present")
  if (!body.stock) errorMessages.push("stock must be present")
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages })
    return
  }
  // Check existing
  Game.find({ name: body.name }).then(game => {
    if (game && game.length > 0) {
      errorMessages.push("name must be unique")
      res.status(422).json({ errorMessages })
    } else {
      // Insert
      const game = new Game(body)
      game.save().then(result => {
        res.json(result)
      })
        .catch(err => next(err))
    }
  })
    .catch(err => next(err))
})

// Update one
router.put("/:id", (req, res, next) => {
  const body = req.body
  // Check body
  const errorMessages = []
  if (!body.name) errorMessages.push("name must be present")
  if (!body.price) errorMessages.push("price must be present")
  if (!body.stock) errorMessages.push("stock must be present")
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages })
    return
  }
  // Update
  const game = {
    name: body.name,
    price: body.price,
    stock: body.stock
  }
  Game.findByIdAndUpdate(req.params.id, game, { new: true })
    .then(updatedGame => {
      if (updatedGame) {
        res.json(updatedGame)
      } else {
        throw new NotFoundError()
      }
    })
    .catch(error => next(error))
})



module.exports = router
