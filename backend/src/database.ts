import mongoose from 'mongoose';

function connectDb() {
  // Build the connection string
  const dbURI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  // Create the database connection
  mongoose
    .connect(dbURI)
    .then(() => {
      console.log('Mongoose connection done');
    })
    .catch(() => {
      console.log('Mongoose connection error');
    });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
  });
}

export {
  connectDb
};