const express = require('express');

/*
    Heroku dynamically assigns a port to the application
    through this env varaible
*/
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`example app started at port ${port}`));
