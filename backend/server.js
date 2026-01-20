import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMissleware.js';
const PORT = process.env.PORT || 5005;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});