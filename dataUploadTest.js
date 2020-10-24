const fetch = require('node-fetch');

let data = () => ({
    "uuid": 'babc1bb1-d596-444c-9079-73433a06a28f',
    "location": {
        "lat": 40.00,
        "lng": 33.12
    },
    "gyro": {
        "x": Math.random()*20-10,
        "y": Math.random()*20-10,
        "z": Math.random()*20-10
    },
    "acc": {
        "x": Math.random()*20-10,
        "y": Math.random()*20-10,
        "z": Math.random()*20-10,
    },
    "air_quality": Math.random(),
    "temp": Math.random()*3+25,
    "pressure": Math.random()*20+1000
});

setInterval(() => {
fetch('http://140.113.168.238/api/uploadRoutineData', {
    method: 'POST',
    body: JSON.stringify(data()),
    headers: {
        'Content-Type': 'application/json'
    }
})
.catch(e => {
    console.log(e);
});}, 1000);
