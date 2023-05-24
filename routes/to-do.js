const path = require("path");
const express = require("express");
const todoController = require("../controller/to-do");


const router = express.Router();

router.post('/create', todoController.createToDo)

router.post('/delete', todoController.deleteToDo)

router.get('/deleteAll', todoController.deleteAllToDos)

router.post('/edit', todoController.getEditPage)

router.post('/update', todoController.updateToDo)

router.get('/', todoController.getHomePage)



module.exports = router;