const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Serve static assets from the 'assets/vanilla' directory

app.use("/assets/vanilla", express.static(path.join(__dirname, "..", "assets", "vanilla")));

// Determine the paths for both directories
// Determine the paths for both directories
const itemDirPath = path.join(__dirname, "..", "assets", "vanilla", "item");
const blockDirPath = path.join(__dirname, "..", "assets", "vanilla", "block");

// Endpoint to fetch item names
app.get("/api/items", (req, res) => {
  fs.readdir(itemDirPath, (err, itemFiles) => {
    if (err) {
      console.error("Error reading item directory:", err.message);
      res.status(500).json({ error: "Failed to read item directory." });
      return;
    }
    res.json(itemFiles.map((block) => block.slice(0, -4)));
  });
});

// Endpoint to fetch block names
app.get("/api/blocks", (req, res) => {
  fs.readdir(blockDirPath, (err, blockFiles) => {
    if (err) {
      console.error("Error reading block directory:", err.message);
      res.status(500).json({ error: "Failed to read block directory." });
      return;
    }
    //return the block files without .png at the end but only keep 1 .png so not .png.png using slice 0, -4
    res.json(blockFiles.map((block) => block.slice(0, -4)));
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  // Print the contents of 'item' directory on server startup
  fs.readdir(itemDirPath, (err, itemFiles) => {
    if (err) {
      console.error("Error reading item directory:", err.message);
    } else {
      console.log("Items Directory Contents:", itemFiles);
    }
  });

  // Print the contents of 'block' directory on server startup
  fs.readdir(blockDirPath, (err, blockFiles) => {
    if (err) {
      console.error("Error reading block directory:", err.message);
    } else {
      console.log("Blocks Directory Contents:", blockFiles);
    }
  });
});
