const express = require('express'); 
const dbConfig = require('./dbConfig'); 
const dotEnv = require('dotenv');
const cors = require('cors');

dotEnv.config();
const app = express();
dbConfig.connectDB();

const userRoutes = require('./routes/user.route.js');
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
}))
// Mount user routes under /api/auth
app.use('/api/auth', userRoutes);


app.listen(8001, () => {
    console.log('Server is up and running on port 8001');
})