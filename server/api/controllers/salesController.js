var Sales = require('../models/sales');
const mongoose = require('mongoose');

exports.getSalesByLocation = function(req, res, next) {
    const locationId = req.params.locationid;
    //console.log(locationId);
    let salesdate = req.params.salesdate.split('-');
    const day = parseInt(salesdate[0]);
    const month = parseInt(salesdate[1]) - 1;
    const year = parseInt(salesdate[2])
    const fromdate = new Date(year, month, day);
    const todate = new Date(year, month, day + 1);
    //console.log(todate);
    var criteria = { 'location': locationId, 'isDeleted': false, "created_date": { "$gte": fromdate, "$lt": todate } };
    Sales.find(criteria)
        .exec(function(err, data) {
            if (err) { return next(err); }
            res.send(data);
        });
};

exports.createSales = function(req, res, next) {

    console.log(req.body);

    var sales = new Sales({
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        sellingPrice: req.body.sellingPrice,
        location: req.body.location,
        isDeleted: false,
        created_date: req.body.modification_date
    });

    if (req.body.isDeleted === 'true') {
        sales.save(function(err, result) {
            if (err) { return next(err); }
            res.send(result);
        });
    }
    else {
        Sales.findByIdAndUpdate(req.body.id, req.body, { new: true }, function(err, result) {
            if (err) { return next(err); }
            res.send(result);
        });
    }
};

exports.getSales = function(req, res, next) {
    Sales.find({})
        .exec(function(err, data) {
            if (err) { return next(err); }
            res.send(data);
        });
};

exports.salesDelete = function(req, res, next) {
    Sales.findByIdAndRemove(req.params.salesId, (err, result) => {
        if (err) return res.status(500).send(err);
        const response = { status: "success" };
        return res.status(200).send(response);
    });
};