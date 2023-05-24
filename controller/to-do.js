const path = require("path");
const { v4: uuidv1 } = require("uuid");
const ToDoItem = require("../model/ToDoItem");

exports.getHomePage = (req, res, next) => {
  ToDoItem.fetchToDos()
    .then((myToDos) => {
      console.log(myToDos);
      res.render("home", {
        items: myToDos,
      });
    })
    .catch((e) => {
      console.log(`unable to fetch to-dos from database`);
    });
};

exports.getEditPage = (req, res, next) => {
  const id = req.body.itemId;
  ToDoItem.getItemById(id)
    .then((result) => {
      console.log(result);
      res.render("edit", {
        item: result,
      });
    })
    .catch((e) => {
      console.log(`unable to edit the given to-do`);
    });
};

exports.updateToDo = (req, res, next) => {
  ToDoItem.updateItem({
    id: req.body.itemId,
    title: req.body.title,
  })
    .then(() => {
      console.log(`item updated successfully`);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(`unable to update the item ${err}`);
      res.redirect("/");
    });
};

exports.createToDo = (req, res, next) => {
  let title = req.body.title;
  let item = new ToDoItem(title);
  item
    .save()
    .then(() => {
      console.log(`${title} added successfully`);
      res.redirect("/");
    })
    .catch((e) => {
      console.log(`failed to add ${title} ${e}`);
      res.redirect("/");
    });
};

exports.deleteToDo = (req, res, next) => {
  let id = req.body.itemId;
  ToDoItem.deleteItem(id)
    .then(() => {
      console.log(`to-do item deleted successfully`);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(`failed to delete to-do item with id ${id}`);
    });
};

exports.deleteAllToDos = (req, res, next) => {
  ToDoItem.deleteAll()
    .then(() => {
      console.log(`all to-dos deleted successfully`);
      res.redirect("/");
    })
    .catch((err) => {
      res.redirect("/");
      console.log(`item deletion failed`);
    });
};
