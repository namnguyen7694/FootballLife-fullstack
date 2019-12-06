const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const publicPath = path.join(__dirname, 'build');
app.use(express.static(publicPath));
const mongoUri = process.env.MONGO_LOCAL_URI;
// const mongoUri = process.env.MONGO_STAGING_URI;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// apiDocs
app.get('/api', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if (err) {
            res.status(400).json({
                error: err
            });
        }
        const docs = JSON.parse(data);
        res.json(docs);
    });
});

// middleware -
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
 });
