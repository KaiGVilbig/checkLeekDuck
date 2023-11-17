import mongoose from 'mongoose';

export const connectMongo = async () => mongoose.connect("mongodb://localhost:27017/leekduck", {family: 4}) 