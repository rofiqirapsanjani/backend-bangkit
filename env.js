const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://bangkit-backend:Bangkit@cluster0.9rwlcvf.mongodb.net/Bangkit?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("Bangkit");
    const ratings = database.collection("users");
    const cursor = ratings.find();
    await cursor.forEach(doc => console.dir(doc));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);