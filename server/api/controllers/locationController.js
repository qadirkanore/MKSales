var Location = require('../models/location');
const mongoose = require('mongoose');

exports.location_list = function(req, res, next) {
    Location.find({})
        .sort({ name: 'ascending' })
        .exec(function(err, data) {
            if (err) { return next(err); }
            //console.log(data);
            data = data.map(function(repo) {
                return { id: repo.id, value: repo.name };
            });
            res.send(data);
        });
};


exports.location_create = function(req, res, next) {
    var location = new Location({
        name: req.body.name,
        description: req.body.description
    });

    location.save(function(err, result) {
        if (err) { return next(err); }
        res.send(result);
    });
};

exports.location_get = function(req, res, next) {
    res.send({});
};

exports.location_update = function(req, res, next) {
    res.send({});
};

exports.location_delete = function(req, res, next) {
    res.send({});
};