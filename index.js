const express = require('express');
const dotenv = require("dotenv")
const cors = require('cors')
const app = express();
app.use(cors())
const port = process.env.PORT || 8000;



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://petbuddy:c3q2svHSC0IbmTqS@ac-01uvoaz-shard-00-00.mnm9k0n.mongodb.net:27017,ac-01uvoaz-shard-00-01.mnm9k0n.mongodb.net:27017,ac-01uvoaz-shard-00-02.mnm9k0n.mongodb.net:27017/?ssl=true&replicaSet=atlas-ozdzge-shard-0&authSource=admin&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const db = client.db("petbuddy");
    const petsCollection = db.collection("pets")

    app.get('/pets', async(req,res)=>{
    const cursor = petsCollection.find();
    const result = await cursor.toArray();
    res.send(result)
})
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
    
})