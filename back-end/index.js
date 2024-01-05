import express from 'express';
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

const app = express();
const PORT = 3001;
let data = [];
dotenv.config();

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});

// create the .env file in root 
// add your MongoDB deployment's connection string in the .env like below
// MONGODB_URI = "mongodb+srv://<username>:<pass>@cluster0..."
const uri = process.env.MONGODB_URI;

//mongo client instance
const client = new MongoClient(uri);

async function run() {
    try {
        // Get the database and collection on which to run the operation        
        const database = client.db("profile");
        const profiledata = database.collection("profiledata");

        // Query for a items where title not empty     
        const query = { title: { $ne: "" } };

        const options = {
            // Sort matched documents based on id
            sort: { "id": 1 },
            //do not include the _id            
            projection: { _id: 0, id: 1, title: 1, url: 1, img: 1, imgalt: 1, cms: 1, technologies: 1, role: 1 },
        };

        const cursor = profiledata.find(query, options);

        if ((await profiledata.countDocuments(query)) === 0) {
            console.log("No documents found!");
        }

        //get returned documents
        for await (const doc of cursor) {
            console.dir(doc);
            data.push(doc);
        }

    } finally {
        await client.close();
    }
}
run().catch(console.dir);

app.use(function (req, res, next) {

    // Allow-Origin from localhost 
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Allow-Origin from all
    // res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods to allow only GET
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    next();
});

app.get('/', (request, response) => {
    response.json(data);
})

