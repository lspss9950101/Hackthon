const fetch = require('node-fetch');

let data = () => ({
    "uuid": 'babc1bb1-d596-444c-9079-73433a06a28f',
    "location": {
        "lat": 40.00,
        "lng": 33.12
    },
    "angle": {
        "roll": 90,
        "pitch": 45,
        "yaw": 0
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
    "pressure": Math.random()*20+1000,
    "attitude": Math.random()*100+ 50
});

setInterval(() => {
fetch('http://127.0.0.1:8080/api/uploadRoutineData', {
    method: 'POST',
    body: JSON.stringify(data()),
    headers: {
        'Content-Type': 'application/json'
    }
})
.catch(e => {
    console.log(e);
});}, 1000);
