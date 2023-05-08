const path = require("path");
const express = require("express"); /* Accessing express module */
const bodyParser = require("body-parser"); /* To handle post parameters */
const app = express(); /* app is a request handler function */

app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "ejs");

const portNumber = process.argv[2];

const uri = "inserthere";

const databaseAndCollection = {db: "CMSC335_DB", collection: "inserthere"};
const { MongoClient, ServerApiVersion } = require('mongodb');


app.get("/", (request, response) => { 

  response.render('index');
}); 


app.get("/name1", (request, response) => {
  const link = "http://localhost:" + portNumber + "/apply";
  const variables = {url: link};
  response.render("name1", variables);
}); 

app.use(bodyParser.urlencoded({extended:false}));

app.post("/name1", (request, response) => {
  const { v1, v2, v3, v4 } =  request.body;
  const variables = { v1: v1, v2: v2, v3: v3, v4: v4 };

  response.render("name2", variables);
  /* Generating the HTML using welcome template */
  }); 


app.get("/name3", (request, response) => {
  const link = "http://localhost:" + portNumber + "/name3";
  const variables = {url: link};
  response.render("name3", variables);

}); 

app.use(bodyParser.urlencoded({extended:false}));

app.post("/name3", (request, response) => {
  const { v1 } =  request.body;
    const variables = {email: v1}

  response.render("name4", variables);

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
