const express = require('express');
const path = require('path');

const authMiddleware = require("./middlewares/auth");
const notFound = require("./middlewares/404");



const authRoute = require('./controllers/AuthController');

const PORT = 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/', (req, res) => {
    console.log("ROOT");
    return res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
})

app.use('/auth', authRoute);

app.get('/dashboard', authMiddleware, (req, res) => {
    console.log("Dashboard");
    return res.sendFile(path.resolve(__dirname, '../public', 'dashboard.html'));
});


// app.get('/dashboard', (req, res, next) => {
//     console.log("Renderizou!");
//     return res.render('dashboard.html');
// });

app.use(notFound);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} ...`);
});