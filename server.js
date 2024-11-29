const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');
const haversine = require('haversine-distance');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Add School API
app.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    });
});

// List Schools API
app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'User latitude and longitude are required.' });
    }

    const userLocation = { lat: parseFloat(latitude), lon: parseFloat(longitude) };

    const query = 'SELECT * FROM schools';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error.' });

        const schools = results.map(school => {
            const schoolLocation = { lat: school.latitude, lon: school.longitude };
            return {
                ...school,
                distance: haversine(userLocation, schoolLocation),
            };
        });

        schools.sort((a, b) => a.distance - b.distance);
        res.status(200).json(schools);
    });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
