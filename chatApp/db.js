exports.setup = function() {

    var MongoClient = require('mongodb').MongoClient
      , assert = require('assert');

    self = this; 
    self.datadDb = null;

    var url = 'mongodb://localhost:27017/myproject'; 
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      self.datadDb = db; 
    });


    this.insert = function(db, targetDocument, dataObject, callback) {
      var collection = self.datadDb.collection(targetDocument);
      collection.insert(dataObject, function(err, result) {
        callback(result);
      });
    };

    this.delete = function(db, targetDocument, dataObject, callback) {
      var collection = self.datadDb.collection(targetDocument);
      collection.remove(dataObject, function(err, result) {
        callback(result);
      });
    };

    this.update = function(db, targetDocument, dataObject, callback) {
      // Get the documents collection
      var collection = self.datadDb.collection(targetDocument);
      // Insert some documents
      collection.update(dataObject, function(err, result) {
        callback(result);
      });
    };
    
    this.find = function(db, targetDocument, dataObject, callback) {
        var collection = self.datadDb.collection('users');
        collection.find({}).toArray(function(err, docs) {
            callback(err, docs);
        });
    };

    this.findLimit = function(db, targetDocument, start, pageSize) {
      // Get the documents collection
      var collection = self.datadDb.collection(targetDocument);
      // Insert some documents
      collection.find(dataObject).skip(start).limit(pageSize);      
    };
}