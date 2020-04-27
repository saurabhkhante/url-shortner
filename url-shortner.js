/*
1. http://localhost:3000/ -> we get a form
2. we submit the form
3. app generates an random id like 234234 => function storeShortUrl
4. return the the front page where we see the new short url in the table below
5. when we visit http://localhost:3000/234234 it redirects to the full url.
*/

const express = require("express");
const app = express();
const sql = require("./sqlFile");
const port = 3000;
const mustacheExpress = require("mustache-express");

// To set up the templating engine
app.engine("html", mustacheExpress());
app.set("view engine", "html");

// function createUrlTable is executed, a table urlTable in database is created
sql.createUrlTable();

app.use(express.urlencoded());

// GET request on "/", calling function getAllRows
app.get("/", (req, res) => {
  sql.getAllRows((rows) => {
    res.render("index", { title: "Hello there", shortUrls: rows });
  });
});

app.post("/", (req, res) => {
  storeShortUrl(req.body.fullUrl);
  res.redirect("/"); //Doubt3: Why we doing this
});

app.get("/:shortCode", (req, res) => {
  // res.redirect(
  //   "https://gist.github.com/nax3t/2773378c4d1bada8d66d12f4d5210248"
  // );
  sql.retreiveFullUrl(req.params.shortCode, (rows) => {
    console.log("*************************************");
    console.log(rows);
    res.redirect(rows[0].fullUrl);
  });
});

function storeShortUrl(url) {
  var shortCode = Math.floor(Math.random() * 100000) + 1;
  sql.gettingTableValues(url, shortCode);
}

app.listen(port, () => console.log(`Listening on port ${port}`));
