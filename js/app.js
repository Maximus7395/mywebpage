/**
 * WEB222 – Assignment 06
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <Kevin Christie>
 *      Student ID: <131362238>
 *      Date:       <13 April 2025>
 */

// All of our data is available on the global `window` object.
// Create local variables to work with it in this file.
const { artists, songs } = window;

window.onload = function () {
  const artistObject = artists;
  const songObject = songs;
  var navigationBar = document.querySelector("#menu");
  var selectedArtist = document.querySelector("#selected-artist");
  var songsList = document.querySelector("#songs");

  artistObject.forEach((artist) => {
    const n = document.createElement("button");
    n.textContent = artist.name;
    n.onclick = () => displaySongs(artist);
    navigationBar.appendChild(n);
  });

  const add_Artist = document.createElement("button");
  add_Artist.textContent = "Request a New Artist";
  add_Artist.onclick = () => {
    window.open("newartists.html", "_blank");
  };
  navigationBar.appendChild(add_Artist);

  displaySongs(artistObject[0]);

  function createSongCard(song) {
    const card = document.createElement("div");
    card.classList.add("card");
    const songImage = document.createElement("img");
    songImage.src = song.imageUrl;
    songImage.classList.add("card-image");
    songImage.addEventListener("click", () => {
      window.open(song.url, "_blank");
    });
    const songTitle = document.createElement("h2");
    songTitle.textContent = song.title;
    songTitle.classList.add("card-title");
    const songYear = document.createElement("time");
    songYear.dateTime = song.year;
    songYear.textContent = song.year;
    songYear.classList.add("card-year");
    const songDuration = document.createElement("span");
    const minute = Math.floor(song.duration / 60);
    const second = song.duration % 60;
    songDuration.textContent = `${minute}:${second.toString().padStart(2, "0")}`;
    songDuration.classList.add("card-duration");

    card.appendChild(songImage);
    card.appendChild(songTitle);
    card.appendChild(songYear);
    card.appendChild(songDuration);

    return card;
  }

  function displaySongs(currentArtist) {
    selectedArtist.innerHTML = `<p>${currentArtist.name}(<a href="${currentArtist.urls[0].url}" target="_blank">Website</a>, 
    <a href="${currentArtist.urls[1].url}" target="_blank">YouTube</a>)</p>
  `;
    songsList.innerHTML = "";

    const artistsSongs = songObject.filter((song) => song.artistId === currentArtist.artistId);

    artistsSongs.forEach((song) => {
      if (song.explicit) {
        return;
      }
      songsList.appendChild(createSongCard(song));
    });
  }
};

window.addMediaInput = function () {
  const wrapper = document.createElement("div");
  wrapper.className = "media-input";

  const input = document.createElement("input");
  input.type = "url";
  input.name = "mediaLinks[]";
  input.placeholder = "https://example.com";
  input.required = true;
  input.pattern = "https?://.+";

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Remove";
  removeBtn.style.marginLeft = "10px";
  removeBtn.onclick = () => wrapper.remove();

  wrapper.appendChild(input);
  wrapper.appendChild(removeBtn);

  document.getElementById("mediaLinks").appendChild(wrapper);
};

document.querySelector("form").addEventListener("reset", () => {
  const mediaLinks = document.getElementById("mediaLinks");

  while (mediaLinks.children.length > 1) {
    mediaLinks.removeChild(mediaLinks.lastChild);
  }
});
