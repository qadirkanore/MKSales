const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const app = express();

//const userRoutes = require('./api/routes/user');
const salesRoutes = require('./api/routes/sales');
const locationRoutes = require('./api/routes/location');
const authRoutes = require('./api/routes/auth');

const MongoURL = 'mongodb://qadirkanore:Qadir32!@ds249372.mlab.com:49372/mk-sales';
mongoose.connect(MongoURL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: "k12jh40918e4019u3",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));


app.use('/api/sales', salesRoutes);
//app.use('/user', userRoutes);
app.use('/api/location', locationRoutes);
app.use('/api', authRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));