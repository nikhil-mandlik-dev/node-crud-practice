const { getDb } = require("../util/database");
const { ObjectId } = require("mongodb");

class ToDoItem {
  constructor(title) {
    this.title = title;
  }

  save(callback) {
    const db = getDb();
    return db.collection("to-do").insertOne(this);
  }

  static fetchToDos() {
    const db = getDb();
    return db.collection("to-do").find().toArray();
  }

  static deleteItem(itemId) {
    const db = getDb();
    return db.collection("to-do").deleteOne({
      _id: new ObjectId(itemId),
    });
  }

  static deleteAll() {
    const db = getDb();
    return db.collection("to-do").deleteMany({});
  }

  static getItemById(id) {
    const db = getDb();
    return db.collection("to-do").findOne({
      _id: new ObjectId(id),
    });
  }

  static updateItem(item) {
    const db = getDb();
    return db.collection("to-do").replaceOne(
      {
        _id: new ObjectId(item.id),
      },
      {
        title: item.title,
      }
    );
  }
}

module.exports = ToDoItem;
