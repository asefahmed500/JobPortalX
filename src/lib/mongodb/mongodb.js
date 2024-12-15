import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MongoDB URI to the environment variables");
}

let client;
let clientPromise;

// Reuse MongoDB connection in development to avoid multiple connections
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

const connectToDatabase = async () => {
  const client = await clientPromise;
  return client.db("jobdao"); // Replace with your database name if needed
};

export default connectToDatabase;
