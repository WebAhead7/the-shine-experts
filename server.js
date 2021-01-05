const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect DB
connectDB();

// Init Middleware

// const corsOptions = {
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 200,
//   'Access-Control-Allow-Origin': '*',
// };

app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/users'));
app.use('/api/authUser', require('./routes/authUser'));
app.use('/api/businesses', require('./routes/businesses'));
app.use('/api/authBusiness', require('./routes/authBusiness'));
app.use('/api/orders', require('./routes/orders'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
