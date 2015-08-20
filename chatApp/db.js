exports.setup = function() {

    var MongoClient = require('mongodb').MongoClient
      , assert = require('assert');

    // Use connect method to connect to the Server
    var url = 'mongodb://localhost:27017/myproject'; 
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
    });


    this.insertDocuments = function(db, targetDocument, dataObject, callback) {
      // Get the documents collection
      var collection = db.collection(targetDocument);
      // Insert some documents
      collection.insert(dataObject, function(err, result) {
        callback(result);
      });
    };

    this.deleleDocuments = function(db, targetDocument, dataObject, callback) {
      // Get the documents collection
      var collection = db.collection(targetDocument);
      // Insert some documents
      collection.remove(dataObject, function(err, result) {
        callback(result);
      });
    };

    this.updateDocuments = function(db, targetDocument, dataObject, callback) {
      // Get the documents collection
      var collection = db.collection(targetDocument);
      // Insert some documents
      collection.update(dataObject, function(err, result) {
        callback(result);
      });
    };

    this.find = function(db, targetDocument, dataObject, callback) {
      // Get the documents collection
      var collection = db.collection(targetDocument);
      // Insert some documents
      collection.find(dataObject, function(err, result) {
        callback(result);
      });
    };

    this.findLimit = function(db, targetDocument, start, pageSize) {
      // Get the documents collection
      var collection = db.collection(targetDocument);
      // Insert some documents
      collection.find(dataObject).skip(start).limit(pageSize);
      
    };

}