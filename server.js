var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:7777
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

app.use(express.static(__dirname + '/public'));

app.listen(7777);