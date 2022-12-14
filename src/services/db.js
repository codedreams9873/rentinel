import mongoose from 'mongoose';
import { MONGO_DB_URI } from 'config';

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGO_DB_URI, {
    autoCreate: true,
    autoIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
}

export function jsonify(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default async function dbMiddleware(req, res, next) {
  try {
    if (!global.mongoose) {
      global.mongoose == dbConnect();
    }
  } catch (e) {
    console.error(e);
  }

  return next();
}
