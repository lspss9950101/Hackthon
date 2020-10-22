const express = require('express');
const app = express();
const server = require('http').createServer(app);

const socketUtil = require('./socket');
const dataUtil = require('./data');

const port = 8080;

socketUtil.init(server);

setInterval(() => {
    dataUtil.appendData('0', socketUtil.uuidSocketMapping, {
        timestamp: Date.now(),
        gyro_x: Math.random() * 20 - 10,
        gyro_y: Math.random() * 30 - 15,
        gyro_z: Math.random() * 50 - 25,
        acc_x: Math.random() * 20,
        acc_y: Math.random() * 6 - 3,
        acc_z: Math.random() * 90 - 10
    });
}, 1000);

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes/router'));

app.use(express.static('web'));

server.listen(process.env.PORT || port, () => {
    console.log('Listening at http://localhost:' + port);
});