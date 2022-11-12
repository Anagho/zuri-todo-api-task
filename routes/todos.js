const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todosController');

router.route('/')
    .get(todosController.getAllTodos)
    .post(todosController.createNewTodo)
    .put(todosController.updateTodo)
    .delete(todosController.deleteTodo)

// Get a single todo
router.route('/:id')
    .get(todosController.getTodo)

module.exports = router;