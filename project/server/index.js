const express = require('express'); 
const dbConfig = require('./dbConfig'); 
const dotEnv = require('dotenv');

dotEnv.config();
const app = express();
dbConfig.connectDB();

app.get('./', (req, res) => {
    res.send('Hello from server!');
})

app.listen(8001, () => {
    console.log('Server is up and running on port 8001');
})