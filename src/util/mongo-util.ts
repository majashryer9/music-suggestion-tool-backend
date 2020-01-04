import mongoose from 'mongoose';

// mongodb://dbUsername:dbPassword@dbHost:dbPort/dbName
const mongoUrl = process.env.MONGO_URL || '';
export const connectToMongo = () => {
    return mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
}