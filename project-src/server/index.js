import express from 'express';
import path from 'path';
const __dirname = path.resolve();
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const secret_key = 'supersecret123';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//  Get JWT
app.post('/api/generateJWT', (req, res) => {

    console.log('req:', req.body);

    var token = jwt.sign(req.body, secret_key, {
        expiresIn: '1h'
    });

    console.log('token:', token);

    res.json(token);
});

app.use(express.static(path.join(__dirname, '../dist')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});