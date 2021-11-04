/*
 * Name: Tuan Tran
 * Date: 5/20, 2020
 * Section: CSE 154 AM
 *
 * This is the JS file to implement some interative functions to my suggestion html file.
 * allow clients to submit a song recommendation
 */

"use strict";
(function() {
  window.addEventListener("load", init);

  /**
   * initializes the page
   * create list of recommended songs.
   */
  function init() {
    createList();
    id("submit-form").addEventListener("submit", function(element) {
      element.preventDefault();
      changeLog();
    });
  }

  /**
   * fetch all song recommedation data
   */
  function createList() {
    fetch("/songs/json")
      .then(checkStatus)
      .then(res => res.json())
      .then(handleReponse)
      .catch(handleError);
  }

  /**
   * send a song recommendation to API
   */
  function changeLog() {
    let params = new FormData(qs("#submit-form"));
    fetch("/recommend", {method: "POST", body: params})
      .then(checkStatus)
      .then(res => res.json())
      .then(handleReponse)
      .catch(console.error);
  }

  /**
   * update recommended list with the new requested song.
   * @param {JSONObject} data list of all songs
   */
  function handleReponse(data) {
    qs("#song-list ul").innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      let li = gen("li");
      let song = gen("a");
      song.textContent = data[i]["artist"] + " - " + data[i]["title"];
      song.href = data[i]["url"];
      li.appendChild(song);
      qs("#song-list ul").appendChild(li);
    }
  }

  /**
   * Tell client if connection has an error
   * @param {response} response status of connection
   */
  function handleError(response) {
    let para = gen("p");
    para.textContent = ("There was an error when reaching the API. " + response + " :(");

    qs("#song-list ul").appendChild(para);
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
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector string.
   * @returns {object} first element matching the selector in the DOM tree (null if none)
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

})();