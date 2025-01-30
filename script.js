const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");

function requestApi(searchTerm) {
  // Encode o termo de busca para URL
  const encodedTerm = encodeURIComponent(searchTerm);
  // Modificar o endpoint para busca exata
  const url = `http://localhost:3000/artists?name_like=${encodedTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      // Filtro adicional no lado do cliente
      const filteredResults = result.filter((artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      displayResults(filteredResults);
    });
}

function displayResults(result) {
  resultPlaylist.classList.add("hidden");

  // Verifica se encontrou algum artista
  if (result.length === 0) {
    resultArtist.innerHTML = `
      <div class="error-container">
        <span>Nenhum artista encontrado</span>
      </div>
    `;
    resultArtist.classList.remove("hidden");
    return;
  }

  // Limpa resultados anteriores
  resultArtist.innerHTML = `
    <div class="grid-container">
      <div class="artist-card">
        <div class="card-img">
          <img id="artist-img" class="artist-img" />
          <div class="play">
            <span class="fa fa-solid fa-play"></span>
          </div>
        </div>
        <div class="card-text">
          <a title="Foo Fighters" class="vst" href=""></a>
          <span class="artist-name" id="artist-name"></span>
          <span class="artist-categorie">Artista</span>
        </div>
      </div>
    </div>
  `;

  const artistName = document.getElementById("artist-name");
  const artistImage = document.getElementById("artist-img");

  result.forEach((element) => {
    artistName.innerText = element.name;
    artistImage.src = element.urlImg;
  });

  resultArtist.classList.remove("hidden");
}

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm === "") {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");
    return;
  }

  requestApi(searchTerm);
});
