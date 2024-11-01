import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(`${process.env.MONGODB_URI}/coursely`);
    console.log("MONGODB is connected");
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED: ", error);
    process.exit(1);
  }
}

export default dbConnect;