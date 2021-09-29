var express = require('express');
var path = require('path');
var login= require('./public/routes/login');
var metu = require('./public/routes/metu');
var follow_uid = require('./public/routes/followuid');
var dm_user = require('./public/routes/dmuser');
var dm_image = require('./public/routes/dmimg');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);
app.use('/metu', metu);
app.use('/followuid', follow_uid);
app.use('/dmuser', dm_user);
app.use('/dmimg', dm_image);

module.export = app;
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("RUN SUKSES");
})