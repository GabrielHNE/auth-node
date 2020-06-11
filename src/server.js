const express = require('express');

const authRoute = require('./controllers/AuthController');

const PORT = 3030;

const app = express();


app.use(express.json());
app.use('/auth', authRoute);

//handling page not found
app.use((req, res, next) => {
    const err = new Error("Page not Found 404");
    err.status = 404;
    next(err);
});


//handling errors
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message, err});
});

app.get('/', (req, res, next) => {
    res.send('HI');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} ...`);
});