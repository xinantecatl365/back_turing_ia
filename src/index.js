const express = require('express');
require('dotenv').config();
const crudRoutes = require('./routes/crudRoutes')
const userRoutes = require('./routes/usersRoutes')
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
crudRoutes.use(cookieParser());
userRoutes.use(cookieParser());
app.use(crudRoutes);
app.use(userRoutes);
app.use(express.static('public'));

const server = require('http').createServer(app);

module.exports = server.listen(process.env.HTTP_PORT, () => {
    console.log(`Server on port ${process.env.HTTP_PORT}`);
});