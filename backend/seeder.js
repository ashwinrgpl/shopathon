import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './model/userModel.js';
import Product from './model/productModel.js';
import Order from './model/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data deleted successfully'.green.inverse);
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);
        console.log('Products created successfully'.green.inverse);
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    };
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data deleted successfully'.green.inverse);
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.inverse);
        process.exit(1);
    };
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    destroyData();
}