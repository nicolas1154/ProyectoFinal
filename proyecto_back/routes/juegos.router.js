const express = require("express")
const router = express.Router()
const juegosController = require("../controllers/juegos.controller")


router.post("/", juegosController.create)
router.get("/", juegosController.find)
router.get("/:id", juegosController.findOne)
router.put("/:id", juegosController.update)
router.delete("/:id", juegosController.remove)




module.exports = router 