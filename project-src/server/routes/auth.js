import express from 'express';
import jwt from 'jsonwebtoken';
const secret_key = 'supersecret123';
const router = express.Router();

router.post('/generate-jwt', (req, res) => {

    console.log('generate-jwt req:', req.body);

    var token = jwt.sign(req.body, secret_key, {
        expiresIn: '1h'
    });

    console.log('generate-jwt token:', token);

    res.json(token);
});

router.post('/decode-jwt', (req, res) => {

    console.log('decode-jwt req:', req.body);

    let decoded_token = jwt.decode(req.body.token, secret_key);

    console.log('decode-jwt decoded_token:', decoded_token);

    res.json(decoded_token);
});


export default router;