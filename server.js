const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes/router'));

app.use(express.static('web'));

app.listen(process.env.PORT || port, () => {
    console.log('Listening at http://localhost:' + port);
});