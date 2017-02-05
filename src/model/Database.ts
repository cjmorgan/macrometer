import mongoose = require('mongoose');

export class Database {

  static get instance():mongoose.Connection {
    if (!Database._instance) {
      new Database();
    }
    return Database._instance;
  }

  static set instance(cnxn:mongoose.Connection) {
    Database._instance = cnxn;
  }

  get connection():mongoose.Connection {
    return this._connection;
  }

  constructor() {

    mongoose.Promise = global.Promise;
    this._connection = mongoose.createConnection('mongodb://localhost/macrometer');
    this._connection.on('error', console.error.bind(console, '[Database]: Connection Error'));

    Database.instance = this._connection;
  }

  private _connection:mongoose.Connection;
  private static _instance:mongoose.Connection;
}
