const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://admin:root@cluster-0-nodejs.lray3cq.mongodb.net/todo?retryWrites=true&w=majority";

let _db;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const mongoConnect = (callback) => {
  client
    .connect()
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((e) => {
      console.log(`mongodb connection failed ${e}`);
      throw e;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw `database connection is not established`;
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
