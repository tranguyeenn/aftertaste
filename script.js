/*************************
 * DOM REFERENCES
 *************************/
const form = document.getElementById("song-form");

const titleInput = document.getElementById("title");
const artistInput = document.getElementById("artist");
const moodInput = document.getElementById("mood");
const favoriteInput = document.getElementById("favorite");

const allList = document.getElementById("all-list");
const favoritesList = document.getElementById("favorites-list");

const navButtons = document.querySelectorAll(".nav button");
const pages = document.querySelectorAll(".page");

let songs = JSON.parse(localStorage.getItem("songs")) || [];

renderSongs();
setupNavigation();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const song = {
    id: Date.now(),
    title: titleInput.value.trim(),
    artist: artistInput.value.trim(),
    mood: moodInput.value,
    favorite: favoriteInput.checked
  };

  if (!song.title || !song.artist) return;

  songs.push(song);
  saveSongs();
  renderSongs();
  form.reset();
});

function renderSongs() {
  allList.innerHTML = "";
  favoritesList.innerHTML = "";

  songs.forEach(song => {
    allList.appendChild(createSongCard(song));

    if (song.favorite) {
      favoritesList.appendChild(createSongCard(song));
    }
  });
}

function createSongCard(song) {
  const card = document.createElement("article");
  card.className = "song-card";

  card.innerHTML = `
    <h3>
      ${song.title}
      ${song.favorite ? '<span class="star">★</span>' : ''}
    </h3>
    <p class="artist">${song.artist}</p>
    <div class="meta">
      <span>${song.mood}</span>
      <button type="button" class="remove">✕</button>
    </div>
  `;

  card.querySelector(".remove").addEventListener("click", () => {
    removeSong(song.id);
  });

  return card;
}

function removeSong(id) {
  songs = songs.filter(song => song.id !== id);
  saveSongs();
  renderSongs();
}

function saveSongs() {
  localStorage.setItem("songs", JSON.stringify(songs));
}

function setupNavigation() {
  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.page + "-page";

      pages.forEach(page => page.classList.remove("active"));
      navButtons.forEach(btn => btn.classList.remove("active"));

      document.getElementById(targetId).classList.add("active");
      button.classList.add("active");
    });
  });
}
