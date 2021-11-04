"use strict";

const fs = require("fs").promises;
const multer = require("multer");
const express = require("express");
const app = express();

app.use(multer().none());

/**
 * This endpoint updates the list of recommended songs
 */
app.post("/recommend", async function(req, res) {
  let title = req.body.title;
  let artist = req.body.artist;
  let url = req.body.url;
  if (title && artist && url) {
    let data = await getSongs();
    data.push({title: title, artist: artist, url: url});
    res.json(data);
    await fs.writeFile("all_songs.json", JSON.stringify(data));
  } else {
    res.type('text');
    res.status(400).send("Missing required param");
  }
});

/**
 * This endpoint return the list of recommended song in either text or JSON.
 */
app.get("/songs/:type", async function(req, res) {
  if ((req.params.type)) {
    let type = req.params.type;
    let data = await getSongs();
    if (type === "json" || type === "text") {
      if (type === "text") {
        data = textify(data);
      }
      res.type(type);
      res.send(data);
    } else {
      res.status(400).send("Invalid file return type, use text or json");
    }
  }
});

/**
 * Create a readable text version of data
 * @param {JAVAObject} data all recommended song data
 * @returns {String} text version of data
 */
function textify(data) {
  let text = "";
  for (let i = 0; i < data.length; i++) {
    text += data[i]["artist"] + " - " + data[i]["title"] + " URL: " + data[i]["url"] + "\n";
  }
  return text;
}

/**
 * Read all song in the all_songs.json file.
 * @return {JAVAObject} Java ojbect of the song data.
 */
async function getSongs() {
  let data = await fs.readFile("all_songs.json", "utf8");
  return JSON.parse(data);
}

app.use(express.static("public"));
const PORT = process.env.PORT || 8000;
app.listen(PORT);