/*
 * Name: Tuan Tran
 * Date: April 22, 2020
 * Section: CSE 154 AM
 *
 * This is the JS file to implement some interative functions to my playlist html file.
 * It lets me create collapsible tabs and within these tabs are videos to the songs I mentioned.
 * It also let me create a button that generate a random song and add it to my HTML file.
 * CP3: Call API to get most popular song from an artist.
 * display top 5 songs from that artist and have links to search
 * those songs up on Youtube.
 *
 * I learn how to use a collapsible tab from this website
 * https://www.w3schools.com/howto/howto_js_collapsible.asp
 *
 * All videos are linked to Youtube and its respective owner.
 */

"use strict";
(function() {

  const URL = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks";
  const API_KEY = "7a496a488a7c7f57c919bc51676ce96d";
  const PHRASES = ["Matching", "Scanning brain waves", "Looking through browser history"];
  let artist = "";
  let flag = false;
  window.addEventListener("load", init);

  /**
   * Init functions  to call other functions
   * add click events to all collapsible
   * add click events to random button
   */
  function init() {
    let collapse = qsa(".coll");
    for (let i = 0; i < collapse.length; i++) {
      collapse[i].addEventListener("click", collapsible);
    }
    id("gen").addEventListener("click", recommend);
  }

  /**
   * add appear class to elementTarget
   */
  function collapsible() {
    this.nextElementSibling.classList.toggle("appear");
  }

  /**
   * set a timmer to for a loading count down
   * after 3 seconds call randomSong()
   */
  function recommend() {
    if (flag === true) {
      id("random-song").innerHTML = "";
    }
    flag = true;
    id("gen").removeEventListener("click", recommend);
    let count = 2;
    let time = setInterval(function() {
      if (count < 0) {
        clearInterval(time);
        id("gen").addEventListener("click", recommend);
        randomSong();
      } else {
        id("loading").textContent = PHRASES[count];
        count--;
      }
    }, 1000);

  }

  /**
   * pick a random song from lists in class artists
   * clone that list item
   * add clone to random-song node
   */
  function randomSong() {
    let allSongs = qsa(".artists li");
    let randNum = Math.floor(Math.random() * allSongs.length);
    let song = allSongs[randNum].cloneNode(true);
    song.children[0].addEventListener("click", collapsible);
    qs("#random-song").appendChild(song);
    let songBtn = qs("#random-song li button");
    let splitName = songBtn.textContent.split("-");
    let splitArtist = splitName[0].trim();
    artist = splitArtist;
    requestData();
  }

  /**
   * Request data from an API
   * Check status of the request
   * turn response into json file
   * process data
   * throw error if any promise fails
   */
  function requestData() {
    fetch(URL + "&api_key=" + API_KEY + "&artist=" + artist + "&format=json")
      .then(checkStatus)
      .then(res => res.json())
      .then(fromArtist)
      .catch(handleError);
  }

  /**
   * Create a menu to suggests other popular songs from an artist
   * @param {JSON} data data received from API
   */
  function fromArtist(data) {
    let suggestion = gen("div");
    let newSongs = gen("button");
    newSongs.textContent = "Top songs from the same artist";
    let ul;
    if (data.toptracks.track.length >= 5) {
      ul = createLinks(data, 5);
    } else {
      ul = createLinks(data, data.toptracks.track.length);
    }

    newSongs.addEventListener("click", function() {
      this.nextElementSibling.classList.toggle("appearence");
    });
    ul.classList.add("expand");
    suggestion.appendChild(newSongs);
    suggestion.appendChild(ul);
    suggestion.classList.add("suggestion");

    qs("#random-song").appendChild(suggestion);
  }

  /**
   * Create YouTube search links for the top 5 or less songs
   *  from an artist
   * Add each link to a list
   * @param {JSON} data data from API
   * @param {number} size how many links to make
   * @return {HTMLElement} div element containing YouTube links
   */
  function createLinks(data, size) {
    let topSongs = data.toptracks.track;
    let div = gen("div");
    let ul = gen("ul");
    for (let i = 0; i < size; i++) {
      let li = gen("li");
      let anchor = gen("a");
      let title = topSongs[i]["name"];
      let searches = title.replace(/\s/, "%20");
      anchor.href = "https://www.youtube.com/results?search_query=" + searches + "%20" + artist;
      anchor.textContent = artist + " - " + topSongs[i]["name"];
      anchor.target = "_blank";
      li.appendChild(anchor);
      ul.appendChild(li);
    }
    div.appendChild(ul);
    return div;
  }

  /**
   * Check the response of contact with the API
   * @param {reponse} response status of connection
   * @returns {response} the reponse from API
   */
  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error(response.statusText + " " + response.status);
    }
  }

  /**
   * Tell client if connection has an error
   * @param {response} response status of connection
   */
  function handleError(response) {
    let para = gen("p");
    para.textContent = ("There was an error when reaching the API. " + response + " :(");

    qs("#random-song").appendChild(para);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id (null if none).
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Create a HTML element
   * @param {string} tagName tag of the element
   * @returns {HTMLElement} the element created
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the array of elements that match the given CSS selector.
   * @param {string} selector - CSS query selector
   * @returns {object[]} array of DOM objects matching the query (empty if none).
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector string.
   * @returns {object} first element matching the selector in the DOM tree (null if none)
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();