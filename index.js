const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
//middleware
app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://Assignment-10:FflOQVyvASuZWH2m@cluster0.pnxdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const crowdcubeCollection = client.db("CrowdcubeDb").collection("Crowdcubes");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    app.post("/crowd", async (req, res) => {
      const newCrowd = req.body;
      const result = await crowdcubeCollection.insertOne(newCrowd);
      res.send(result);
    });
    app.get("/crowd", async (req, res) => {
      const result = await crowdcubeCollection.find().toArray();
      res.send(result);
    });
    //details pages er jonno
    app.get("/crowd/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await crowdcubeCollection.findOne(query);
      res.send(result);
    });

    app.delete("/crowd/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await crowdcubeCollection.deleteOne(query);
      res.send(result);
    });
    //   //updated
    app.get("/crowd/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await crowdcubeCollection.findOne(query);
      res.send(result);
    });
    app.put("/crowd/:id", async (req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log(user);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUser = {
        $set: {
          title: user.title,
          type: user.type,
          minDonation: user.minDonation,
          image: user.image,
          deadline: user.deadline,
          description: user.description,
        },
      };
      const result = await crowdcubeCollection.updateOne(
        filter,
        options,
        updatedUser
      );
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Assignment-10 userid
//pass: FflOQVyvASuZWH2m
