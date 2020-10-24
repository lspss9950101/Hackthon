const express = require('express');
const app = express();
const server = require('http').createServer(app);

const socketUtil = require('./socket');
const linebotUtil = require('./linebot');

const port = 8080;

socketUtil.init(server);
linebotUtil.init(server);

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', (req, res, next) => {
    console.log('request');
    next();
});
app.use('/', require('./routes/router'));

app.use(express.static('web'));

server.listen(process.env.PORT || port, () => {
    console.log('Listening at http://localhost:' + (process.env.PORT || port));
});