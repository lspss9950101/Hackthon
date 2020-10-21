const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socketUtil = require('./socket');
const dataUtil = require('./data');

socketUtil.init(server);

setInterval(() => {
    dataUtil.appendData('0', {x: Date.now(), y: Math.random()*20-10}, socketUtil.uuidSocketMapping);
}, 1000);

const bodyParser = require('body-parser');
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes/router'));

app.use(express.static('web'));

server.listen(process.env.PORT || port, () => {
    console.log('Listening at http://localhost:' + port);
});