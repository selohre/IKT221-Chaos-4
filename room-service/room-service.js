const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let rooms = [
    { roomId: 101, type: 'Standard', features: ['TV', 'Air Conditioner'], available: true },
    { roomId: 102, type: 'Deluxe', features: ['TV', 'Air Conditioner', 'Refrigerator'], available: true }
];

// Get all rooms
app.get('/rooms', (req, res) => {
    res.json(rooms);
});

// Get specific room by roomId
app.get('/rooms/:roomId', (req, res) => {
    const room = rooms.find(r => r.roomId === parseInt(req.params.roomId));
    if (room) {
        res.json(room);
    } else {
        res.status(404).send('Room not found');
    }
});

// Update room availability
app.patch('/rooms/:roomId', (req, res) => {
    const room = rooms.find(r => r.roomId === parseInt(req.params.roomId));
    if (room && req.body.hasOwnProperty('available')) {
        room.available = req.body.available;
        res.json(room);
    } else {
        res.status(404).send('Room not found or invalid request');
    }
});

app.listen(PORT, () => {
    console.log(`Room Service is running on port ${PORT}`);
});
