const express = require('express');


const PORT = 3030;

const app = express();

app.get('/', (req, res, next) => {
    res.send('HI');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} ...`);
});