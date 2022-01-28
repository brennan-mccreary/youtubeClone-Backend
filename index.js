//Imports
const connectDB = require('./startup/db');
const express = require('express');
const cors = require('cors');
const config = require('config');
const youtubeAPIKey = config.get('youtubeAPIKey');
const fetch = require('node-fetch');
const res = require('express/lib/response');
const app = express();

//Connect to Database
connectDB();

//App use list
app.use(cors());
app.use(express.json());


//Listen on port 5002
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});

app.get('/', async (req, res) => {
    const value = await fetchData(youtubeAPIKey);
    return res.send(value.items[0].id.videoId);
});

async function fetchData(key) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=branchedgamingnetwork&type=video&key=${key}`);
    const resData = response.json();
    return resData;
}