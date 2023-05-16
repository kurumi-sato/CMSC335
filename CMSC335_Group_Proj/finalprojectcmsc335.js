const path = require("path");
const express = require("express"); /* Accessing express module */
const bodyParser = require("body-parser"); /* To handle post parameters */
const app = express(); /* app is a request handler function */

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

const portNumber = process.argv[2];

const uri = "inserthere";

const databaseAndCollection = {db: "CMSC335_DB", collection: "STUDENT_LIST"};
const { MongoClient, ServerApiVersion } = require('mongodb');





app.get("/", (request, response) => { 
  const variables = { portNumber: portNumber};
  
  
  response.render('index', variables);
}); 

app.use(bodyParser.urlencoded({extended:false}));

app.post("/processApplication", (request, response) => {
  const { name, email, gpa, year, type, reason, comment } =  request.body;
  const variables = { name: name, email: email, gpa: gpa, year: year, type: type, reason:reason, comment:comment };
  processInsert(variables);

  async function processInsert(variables) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();
        await insertData(client, databaseAndCollection, variables);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
  }

async function insertData(client, databaseAndCollection, applicant) {
    const result = await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(applicant);

  
}

process();
async function process() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

try {
  await client.connect();
  let filter = {};
  const cursor = client.db(databaseAndCollection.db)
      .collection(databaseAndCollection.collection).find(filter);
      
      /* Turn this into a table to add as html code into the final page*/
  const result = await cursor.toArray();
  var htmlcode = "<table border='1'> </tr> <th>Name</th> <th>Year</th>  </tr> ";
  result.forEach(element => {

    htmlcode += '<tr>' + '<td> ' + element.name + ' </td> <td> ' + element.year + '</td> </tr>';
  });

  htmlcode += " </table>";
  const variables = { table: htmlcode };
  response.render("processAdminGFA", variables);
} catch (e) {
  console.error(e);
} finally {
  await client.close();
}}


  response.render("confirmation", variables);
}); 



process.stdin.setEncoding("utf8"); /* encoding */

if (process.argv.length != 3) {
  process.stdout.write(`Usage ${process.argv[1]} port Number`);
  process.exit(1);
}

app.listen(portNumber);
console.log(`Web server started and running at http://localhost:${portNumber}`);

const filename = process.argv[2];

const prompt = "Type stop to shutdown the server: ";
process.stdout.write(prompt);

process.stdin.on("readable", function () {
  let dataInput = process.stdin.read();
  let command = dataInput.trim();
  if (command === "stop") {
      console.log("Shutting down the server");
      process.exit(0);  /* exiting */
    } else {
      console.log(`Invalid command: ${command}`);
      process.stdout.write(prompt);
      process.stdin.resume();
    }
});

// Database Functions

require("dotenv").config({ path: path.resolve(__dirname, 'credentials/.env') })  

const userName = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

/* Our database and collection */
const databaseAndCollection = {db: process.env.MONGO_DB_NAME, collection:process.env.MONGO_COLLECTION};

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${userName}:${password}@cluster0.zho1gsz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
