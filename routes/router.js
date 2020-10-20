const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const dbMap = new sqlite3.Database(':memory:');
const dbRoutine = new sqlite3.Database(':memory:');

router.post('/api/uploadMarker', (req, res) => {
    console.log('Acquired new data ', req.body, '.');
    dbMap.serialize(() => {
        dbMap.run('CREATE TABLE IF NOT EXISTS map (LAT REAL, LNG REAL)');
        let insert = "INSERT INTO map(lat, lng) VALUES (?,?)";
        dbMap.run(insert, [req.body.lat, req.body.lng]);
        res.end();
    });
});

router.post('/api/uploadRoutineData', (req, res) => {
    dbRoutine.serialize(() => {
        dbRoutine.run('CREATE TABLE IF NOT EXIST routine (timestamp INTEGER, uuid TEXT, lat REAL, lng REAL, acc_x REAL, acc_y REAL, acc_z REAL, gyro_x REAL, gyro_y REAL, gyro_z REAL, pressure REAL, temp REAL)');
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