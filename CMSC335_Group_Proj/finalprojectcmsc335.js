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
  const variables = { portNumber: portNumber};
  
  response.render('index', variables);
}); 

app.use(bodyParser.urlencoded({extended:false}));

app.post("/processApplication", (request, response) => {
  const { name, email, gpa, year, type, reason, comment } =  request.body;
  const variables = { name: name, email: email, gpa: gpa, year: year, type: type, reason:reason, comment:comment };
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
