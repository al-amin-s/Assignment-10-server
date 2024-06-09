const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middlewere
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fe2luxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const artCollection = client.db("artDB").collection("art");
        const categoryCollection=client.db("artDB").collection("category");
        app.post('/art', async (req, res) => {
            const newArt = req.body;
            console.log(newArt);
            const result = await artCollection.insertOne(newArt);
            res.send(result)
        })

        app.get('/art', async (req, res) => {
            const cursor = artCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        
        
        app.get('/art/:id', async (req, res) => {
            const id=req.params.id;
             const query={_id:new ObjectId(id)};
            const result = await artCollection.findOne(query);
            res.send(result);
        })

        app.get("/art/:email", async(req,res)=>{
            console.log(req.params.email);
            const result=await artCollection.find({ email: req.params.email }). toArray();
            res.send(result)
        })

        app.post('/category', async (req, res) => {
            const newCategory = req.body;
            console.log(newCategory);
            const result = await categoryCollection.insertOne(newCategory);
            res.send(result)
        })

        app.get('/category', async (req, res) => {
            const cursor = categoryCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        
        
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        
    }
}
run().catch(console.dir);







const hello = [
    {
        name: "alamin",
        email: "ala756297@gmail.com",
        mobile: "nai"
    }
]

app.get('/', (req, res) => {
    res.send(hello)
})

app.listen(port, () => {
    console.log(`Example app are listening from ${port}`)
})