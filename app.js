var express = require('express');
var path = require('path');
var login= require('./routes/login');
var metu = require('./routes/metu');
var follow_uid = require('./routes/followuid');
var dm_user = require('./routes/dmuser');
var dm_image = require('./routes/dmimg');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);
app.use('/metu', metu);
app.use('/followuid', follow_uid);
app.use('/dmuser', dm_user);
app.use('/dmimg', dm_image);

module.exports = app;