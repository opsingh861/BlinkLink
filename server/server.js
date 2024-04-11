const express = require('express');
const connectDB = require('./db/connection');
const authRoutes = require('./routes/auth.route');
const linkRoutes = require('./routes/link.route');
const verifyToken = require('./utils/verifyUser');
const { redirectToOriginalLink, incrementClicks } = require('./controllers/link.controller');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/:shortUrl', redirectToOriginalLink);

app.use('/api/auth', authRoutes);
app.use('/api/links', verifyToken, linkRoutes);






app.listen(3000, () => {
    connectDB();
    console.log('Server is running on port 3000');
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});
