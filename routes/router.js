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

router.post('/api/uploadRoutineData', (req, res) => {
    dbRoutine = new sqlite3.Database(req.body.uuid + '.db');
    dataUtil.appendData('0', socketUtil.uuidSocketMapping, {
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

router.get('/api/getMarkers', (req, res) => {
    dbMap.serialize(() => {
        dbMap.run('CREATE TABLE IF NOT EXISTS map (LAT REAL, LNG REAL)');
        let query = 'SELECT rowid as id,LAT,LNG FROM map';
        dbMap.all(query, (err, rows) => {
            let result = rows.map(row => ({ lat: row.LAT, lng: row.LNG }));
            res.json(result);
        });
    });
});

router.get('/api/clear', (req, res) => {
    db.serialize(() => {
        dbMap.run('CREATE TABLE IF NOT EXISTS map (LAT REAL, LNG REAL)');
        let deletion = 'DELETE FROM map';
        dbMap.run(deletion);
        res.end();
    });
});

module.exports = router;