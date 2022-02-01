//Imports
const connectDB = require('./startup/db');
const express = require('express');
const cors = require('cors');
const app = express();

//Routes
const videos = require('./routes/videos');

//Connect to Database
connectDB();

//App use list
app.use(cors());
app.use(express.json());
app.use('/api/videos', videos);

//Listen on port 5002
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

//Test Connection with Front End
app.get('/', async (req, res) => {
    const value = 'Connection with Backend Established';
    return res.send(value);
});

