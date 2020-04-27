var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("url-shortner.db");

const DBSOURCE = "db.sqlite3";

function createUrlTable() {
  db.run("CREATE TABLE IF NOT EXISTS urlTable (fullUrl TEXT, shortCode TEXT)");
}

function gettingTableValues(fullUrl, shortCode) {
  db.run(`INSERT INTO urlTable(fullUrl, shortCode) VALUES(?,?)`, [
    fullUrl,
    shortCode,
  ]);
}

// Defined function getAllRows
// err: stores error details if there are while execution of the query
// rows: containts the result set of the query
// callback(rows) sends this result where the function is called
function getAllRows(callback) {
  db.all("SELECT * FROM urlTable", (err, rows) => {
    console.log(rows);
    callback(rows);
  });
}

function retreiveFullUrl(shortCode, callback) {
  db.all(
    "SELECT * FROM urlTable WHERE shortCode = ? ",
    [shortCode],
    (err, rows) => {
      callback(rows);
    }
  );
}

module.exports = {
  createUrlTable,
  gettingTableValues,
  getAllRows,
  retreiveFullUrl,
};
