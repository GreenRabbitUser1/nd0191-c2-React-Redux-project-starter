import express from 'express';
import path from 'path';
const __dirname = path.resolve();
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:5173'
};

const app = express();
const PORT = 3000;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/auth', authRoutes);


app.use(express.static(path.join(__dirname, '../dist')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});