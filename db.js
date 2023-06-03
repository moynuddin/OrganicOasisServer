import mongoose from "mongoose";

export const dbConnect = async (url) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.log(error, "Error in connection");
    process.exit(1);
  }
};
