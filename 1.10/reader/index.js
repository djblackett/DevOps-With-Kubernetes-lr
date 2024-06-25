const fs = require("fs");
const path = require("path");
const express = require("express");
const crypto = require("crypto");
const app = express();
const filePath = path.join("/usr/src/app/files", "timestamp.txt");

app.get("/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
      console.error("Error reading file:", err);
      return;
    }
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    res.send(`Timestamp: ${data}<br>Hash: ${hash}`);
  });
});

app.listen(3000, () => {
  console.log("Reader app listening on port 3000");
});
