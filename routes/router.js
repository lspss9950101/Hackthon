const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const dbMap = new sqlite3.Database(':memory:');
var dbRoutine;
const dataUtil = require('./../data');
const socketUtil = require('./../socket');

router.post('/api/uploadMarker', (req, res) => {
    console.log('Acquired new data ', req.body, '.');
    dbMap.serialize(() => {
        dbMap.run('CREATE TABLE IF NOT EXISTS map (lat REAL, lng REAL)');
        let insert = "INSERT INTO map(lat, lng) VALUES (?,?)";
        dbMap.run(insert, [req.body.lat, req.body.lng]);
        res.end();
    });
});

router.post('/api/uploadRoutineData', (req, res) => {git
    dbRoutine = new sqlite3.Database('data/' + req.body.uuid + '.db');
    dataUtil.appendData(req.body.uuid, socketUtil.uuidSocketMapping, {
        timestamp: Date.now(),
        gyro_x: req.body.gyro.x,
        gyro_y: req.body.gyro.y,
        gyro_z: req.body.gyro.z,
        acc_x: req.body.acc.x,
        acc_y: req.body.acc.y,
        acc_z: req.body.acc.z
    });
    dbRoutine.serialize(() => {
        dbRoutine.run('CREATE TABLE IF NOT EXISTS routine (timestamp INTEGER, lat REAL, lng REAL, acc_x REAL, acc_y REAL, acc_z REAL, gyro_x REAL, gyro_y REAL, gyro_z REAL, pressure REAL, temp REAL, air REAL)');
        let insert = "INSERT INTO routine(timestamp, lat, lng, gyro_x, gyro_y, gyro_z, acc_x, acc_y, acc_z, pressure, temp, air) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        dbRoutine.run(insert, [Date.now(), req.body.location.lat, req.body.location.lng, req.body.gyro.x, req.body.gyro.y, req.body.gyro.z, req.body.acc.x, req.body.acc.y, req.body.acc.z, req.body.pressure, req.body.temp, req.body.air_quality]);
        dbRoutine.close();
        res.end();
    });
});

router.post('/api/getRoutineData', (req, res) => {
    dbRoutine = new sqlite3.Database('data/' + req.body.uuid + '.db');
    dbRoutine.serialize(() => {
        dbRoutine.run('CREATE TABLE IF NOT EXISTS routine (timestamp INTEGER, lat REAL, lng REAL, acc_x REAL, acc_y REAL, acc_z REAL, gyro_x REAL, gyro_y REAL, gyro_z REAL, pressure REAL, temp REAL, air REAL)');
        let field = '';
        console.log(req.body);
        switch (req.body.type) {
            case 'Gyro X':
                field = 'gyro_x';
                break;
            case 'Gyro Y':
                field = 'gyro_y';
                break;
            case 'Gyro Z':
                field = 'gyro_z';
                break;
            case 'Acc X':
                field = 'acc_x';
                break;
            case 'Acc Y':
                field = 'acc_y';
                break;
            case 'Acc Z':
                field = 'acc_z';
                break;
        }
        let dateStart = new Date(req.body.date);
        dateStart.setHours(0);
        dateStart.setMinutes(0);
        dateStart.setSeconds(0);
        let dateEnd = new Date(req.body.date);
        dateEnd.setHours(0);
        dateEnd.setMinutes(0);
        dateEnd.setSeconds(0);
        dateEnd.setTime(dateEnd.getTime() + 24*60*60*1000);
        let query = "SELECT timestamp, " + field + ' AS value FROM routine WHERE timestamp >= ' + dateStart.getTime() + ' AND timestamp <= ' + dateEnd.getTime();
        dbRoutine.all(query, (err, rows) => {
            if(err) console.log(err);
            let dataNum = Math.min(3600, rows.length);
            let step = Math.ceil(rows.length / dataNum);

            let extreme = 0;
            let result = [];
            for(let idx = 0; idx < rows.length; idx ++) {
                if(Math.abs(extreme) < Math.abs(rows[idx].value))
                    extreme = rows[idx].value;
                if(idx % step == step-1) {
                    result.push({
                        time: rows[idx].timestamp,
                        value: extreme
                    });
                    extreme = 0;
                }
            }

            console.log(result.length);
            res.json(result);
        });
    });
});

router.get('/api/getMarkers', (req, res) => {
    dbMap.serialize(() => {
        dbMap.run('CREATE TABLE IF NOT EXISTS map (lat REAL, lng REAL)');
        let query = 'SELECT lat,lng FROM map';
        dbMap.all(query, (err, rows) => {
            let result = rows.map(row => ({ lat: row.lat, lng: row.lng }));
            res.json(result);
        });
    });
});

router.get('/api/clear', (req, res) => {
    db.serialize(() => {
        dbMap.run('CREATE TABLE IF NOT EXISTS map (lat REAL, lng REAL)');
        let deletion = 'DELETE FROM map';
        dbMap.run(deletion);
        res.end();
    });
});

module.exports = router;