const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

router.post('/api/uploadMarker', (req, res) => {
    console.log('Acquired new data ', req.body, '.');
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS map (LAT REAL, LNG REAL)');
        let insert = "INSERT INTO map(lat, lng) VALUES (?,?)";
        db.run(insert, [req.body.lat, req.body.lng]);
        res.end();
    });
});

router.get('/api/getMarkers', (req, res) => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS map (LAT REAL, LNG REAL)');
        let query = 'SELECT rowid as id,LAT,LNG FROM map';
        db.all(query, (err, rows) => {
            let result = rows.map(row => ({lat: row.LAT, lng: row.LNG}));
            res.json(result);
        });
    });
});

router.get('/api/clear', (req, res) => {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS map (LAT REAL, LNG REAL)');
        let deletion = 'DELETE FROM map';
        db.run(deletion);
        res.end();
    });
});

module.exports = router;