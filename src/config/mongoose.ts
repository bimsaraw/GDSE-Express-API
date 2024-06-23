import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/gdse-db');

const db = mongoose.connection;

db.on('connected', () => console.log("connected to db"));
db.on('error', () => console.log("error connecting to db"));

export default mongoose;