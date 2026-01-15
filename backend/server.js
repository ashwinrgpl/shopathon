import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import products from './data/products.js';
import connectDB from './config/db.js';
const PORT = process.env.PORT || 5005;
const app = express();

connectDB();
app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});