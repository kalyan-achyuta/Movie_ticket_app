const express = require('express'); 
const dbConfig = require('./dbConfig'); 
const dotEnv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotEnv.config();
const app = express();
dbConfig.connectDB();

const userRoutes = require('./routes/user.route.js');
const movieRoutes = require('./routes/movie.route.js')
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser());
// Mount user routes under /api/auth
app.use('/api/auth', userRoutes);
app.use('/api/movie', movieRoutes)

app.listen(8001, () => {
    console.log('Server is up and running on port 8001');
})