var mongoose = require('mongoose');
const toJson = require('meanie-mongoose-to-json');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var LocationSchema = new mongoose.Schema({
    name: String,
    description: String
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  });

 
LocationSchema.plugin(toJson);
LocationSchema.plugin(autoIncrement.plugin,{
    model: 'Location',
    startAt: 1001,
    incrementBy: 1
});

module.exports = mongoose.model('Location', LocationSchema);