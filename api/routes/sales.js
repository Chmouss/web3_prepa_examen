const router = require('express').Router()
const Sale = require("../models/sale")
const Game = require("../models/game")


// Find all
router.get("/", (req, res, next) => {
  Sale.find({})
    .then(sales => res.json(sales))
    .catch(err => next(err))
})

// Find by ID
router.get("/:id", (req, res, next) => {
  Sale.findById(req.params.id).then(sale => {
    if (sale) {
      res.json(sale)
    } else {
      throw new NotFoundError()
    }
  }).catch(err => next(err))
})

// Delete one
router.delete("/:id", (req, res, next) => {
  Sale.findByIdAndRemove(req.params.id).then(result => {
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
  if (!body.buyer) errorMessages.push("buyer must be present")
  if (!body.date) errorMessages.push("date must be present")
  if (!body.quantity) errorMessages.push("quantity must be present")
  if (body.quantity > 0) errorMessages.push("a must be present")
  if (!body.game) errorMessages.push("game must be present")
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages })
    return
  }
  // Check existing
  Sale.find({ name: body.name }).then(sale => {
    if (sale && sale.length > 0) {
      errorMessages.push("name must be unique")
      res.status(422).json({ errorMessages })
    } else {
      // Insert
      //recup id jeu pour recup prix et creer new sale contenant prix
      Game.find(body.Game).then(game => {
        if(game == null){
            res.status(404).json({ errorMessages })
            return
        }
        if(game.stock < body.quantity){
            res.status(422).json({ errorMessages })
            return
        }
        //update game stock apres vente(sale)
        const gameNouveau = new Game({...game, stock: stock - body.quantity})
        Game.findByIdAndUpdate(body.game, gameNouveau, {new : true}).then(gameNouveau => {gameNouveau.save()})

        //calcul total de la vente
        const prixTotal = (body.quantity * game.price)
        const newSale = {buyer:body.buyer, date:body.date, quantity:body.quantity, total:prixTotal, game:body.game}

        //creation nouvelle Sale 
        const sale = new Sale(newSale)
        sale.save().then(result => {
            res.json(result)
        })
            .catch(err => next(err))
      }) 
    }
  })
    .catch(err => next(err))
})

// Update one
router.put("/:id", (req, res, next) => {
  const body = req.body
  // Check body
  const errorMessages = []
  if (!body.buyer) errorMessages.push("buyer must be present")
  if (!body.date) errorMessages.push("date must be present")
  if (!body.quantity) errorMessages.push("quantity must be present")
  if (!body.total) errorMessages.push("total must be present")
  if (!body.game) errorMessages.push("game must be present")
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages })
    return
  }
  // Update
  const sale = {
    name: body.name,
    number: body.number,
    quantity: body.quantity,
    total: body.total,
    game: body.game,
  }
  Sale.findByIdAndUpdate(req.params.id, sale, { new: true })
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
