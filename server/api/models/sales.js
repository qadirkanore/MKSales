var mongoose = require('mongoose');
const toJson = require('meanie-mongoose-to-json');
var autoIncrement = require('mongoose-auto-increment');
require('mongoose-double')(mongoose);

autoIncrement.initialize(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var SalesSchema = new mongoose.Schema({
    itemName: String,
    itemType: String,
    sellingPrice: SchemaTypes.Double,
    location: { type: Number, ref: 'Location', required: true },
    isDeleted: { type: Boolean, default: false },
    created_date: { type: Date },
    modification_date: { type: Date }
},
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    });


SalesSchema.plugin(toJson);
SalesSchema.plugin(autoIncrement.plugin, {
    model: 'Sales',
    startAt: 1001,
    incrementBy: 1
});

module.exports = mongoose.model('Sales', SalesSchema);