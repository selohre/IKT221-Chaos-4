const express = require('express');
const { Pool } = require('pg');
const app = express();

app.use(express.json());

// Configure database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// API to create a booking
app.post('/bookings', async (req, res) => {
    const { userId, roomId, date } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO bookings (user_id, room_id, date) VALUES ($1, $2, $3) RETURNING *;',
            [userId, roomId, date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// API to view all bookings with a headline
app.get('/bookings', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bookings;');
        res.status(200).send(`<h1>Bookings</h1><pre>${JSON.stringify(result.rows, null, 2)}</pre>`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});
