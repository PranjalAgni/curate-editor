import connectDB from "./db";

const main = async (): Promise<void> => {
  await connectDB();
};

export default main;
