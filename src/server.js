const express = require('express');
const path = require('path');

const authMiddleware = require("./middlewares/auth");
const notFound = require("./middlewares/404");

const authRoute = require('./controllers/AuthController');
const userController = require('./controllers/UserController');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());

// app.get('/', (req, res) => {
//     return res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
// });

// app.use('/auth', authRoute);

app
    .get('/users', userController.show )
    .post()
    .del()

app.get('/dashboard', authMiddleware, (req, res) => {
    return res.send('dashboard');
});

app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} ...`);
});