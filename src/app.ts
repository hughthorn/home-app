import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const port = process.env.port || 3000;
app.set('port', port);

/*
    ? Middleware Registration
*/
app.use(bodyParser.json());

/*
    ? Router Registration
*/



app.listen(port, () => {
    console.log(`Home app running at http://localhost:${port}`);
});