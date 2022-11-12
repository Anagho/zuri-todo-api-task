const Todo = require("../models/Todo");

// Get all Todos
const getAllTodos = async (req, res) => {
  const todos = await Todo.find();
  if (!todos) return res.status(204).json({ message: "No todos found." });
  res.json(todos);
};

// Create Todo
const createNewTodo = async (req, res) => {
  // If we don't have a title or description
  if (!req?.body?.title || !req?.body?.description) {
    return res
      .status(400)
      .json({ message: "Title and Description are required" });
  }

  // If the title and description are provided
  try {
    const result = await Todo.create({
      title: req.body.title,
      description: req.body.description,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  // If we can't find a particular todo
  if (!req?.body?.id) {
    return res
      .status(400)
      .json({ message: `No todo matches ID ${req.body.id}` });
  }

  const todo = await Todo.findOne({ _id: req.body.id }).exec();

  if (!todo) {
    return res
      .status(400)
      .json({ message: `No todo matches ID ${req.body.id}` });
  }
  if (req.body?.title) todo.title = req.body.title;
  if (req.body?.description) todo.description = req.body.description;
  const result = await todo.save();
  res.json(result);
};

// Delete Todo
const deleteTodo = async (req, res) => {
  if (!req?.body?.id)
    return res
      .status(400)
      .json({ message: `No todo matches ID ${req.body.id}` });

  const todo = await Todo.findOne({ _id: req.body.id }).exec();
  if (!todo) {
    return res
      .status(400)
      .json({ message: `No todo matches ID ${req.body.id}` });
  }
  const result = await todo.deleteOne({ _id: req.body.id });
  res.json(result);
};

// Get a single Todo
const getTodo = async (req, res) => {
  if (!re?.params?.id)
    return res.status(400).json({ message: "Todo ID required." });

  const todo = await Todo.findOne({ _id: req.params.id }).exec();

  if (!todo) {
    return res
      .status(400)
      .json({ message: `Todo ID ${req.params.id} not found` });
  }
  res.json(todo);
};

module.exports = {
  getAllTodos,
  createNewTodo,
  updateTodo,
  deleteTodo,
  getTodo,
};
