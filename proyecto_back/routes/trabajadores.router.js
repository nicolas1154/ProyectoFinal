const express = require("express")
const router = express.Router()
const trabajadoresController = require("../controllers/trabajadores.controller")



router.post("/", trabajadoresController.create)
router.get("/", trabajadoresController.find)
router.get("/:id", trabajadoresController.findOne)
router.put("/:id", trabajadoresController.update)
router.delete("/:id", trabajadoresController.remove)




module.exports = router 