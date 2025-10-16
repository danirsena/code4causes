let currentCharacter = null
let currentGameIndex = 0

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');


let animatronics = []
let games = []

// Sidebar
function initializeSidebar() {
  const sidebar = document.getElementById("sidebar")
  const toggleBtn = document.getElementById("toggleSidebar")

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed")
    playClickSound("audios/close.ogg")
  })

  // Criar navegação dos jogos
  const gameNav = document.getElementById("gameNav")
  games.forEach((game, index) => {
    const navItem = document.createElement("div")
    navItem.className = "nav-item"
    navItem.textContent = game.name
    navItem.addEventListener("click", (
      () => {
        scrollToGame(index)
        playClickSound("audios/nav-item.ogg")
      }
    ))
    gameNav.appendChild(navItem)
  })
}

// Renderizar jogos
function initializeGames() {
  const container = document.getElementById("gamesContainer")

  games.forEach((game) => {
    const section = document.createElement("section")
    section.className = "game-section"
    section.id = game.id
    section.style.background = game.background

    section.innerHTML = `
            <div class="game-header">
                <!--<img src="${game.photoUrl}" alt="${game.name}" class="game-icon">-->
                <div class="game-info">
                    <h2>${game.name}</h2>
                    <div class="game-meta">
                        <span>📅 ${dateFormate(game.dateOfRelease)}</span>
                        <span>👤 ${game.creator}</span>
                    </div>
                    <p class="game-description" >${game.description}</p>
                </div>
            </div>
            <div class="characters-grid" id="characters-${game.id}"></div>
        `

    section.style.backgroundImage = `url(${game.photoUrl})`;
    container.appendChild(section)

    // Renderizar personagens
    const charactersGrid = document.getElementById(`characters-${game.id}`)
    animatronics.forEach((character) => {
      if (character.game.id === game.id) {
        const characterCard = createCharacterCard(character)
        charactersGrid.appendChild(characterCard)
      }
    })
  })
}

function dateFormate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(date).toLocaleDateString("pt-BR", options)
}

// Criar card de personagem
function createCharacterCard(character) {
  const card = document.createElement("div");
  card.className = "character-card";

  // Define a borda com a imagem
  card.style.borderWidth = "9px"; // define a espessura da borda
  card.style.borderStyle = "solid";
  card.style.borderImage = `url(${character.game.photoUrl}) 30 round`;
  // '30' é a fatia da borda (ajuste conforme a imagem)
  // 'round' faz a imagem repetir na borda se necessário

  const imageUrl = character.photos && character.photos.length > 0 ? character.photos[0].url : "default.png";

  card.innerHTML = `
        <img src="${imageUrl}" alt="${character.name}" class="character-img">
        <h3>${character.name}</h3>
        <span class="character-type">${character.typeAnimatronic.name}</span>
    `;

  card.addEventListener("click", () => {
    playClickSound("audios/monitor.ogg");
    openCharacterModal(character);
  });

  return card;
}

// Som de clique (simulado)
function playClickSound(audioUrl) {

  const audio = new Audio(audioUrl)
  audio.play()

}

// Modal
function initializeModal() {
  const modal = document.getElementById("characterModal")
  const closeBtn = modal.querySelector(".modal-close")

  closeBtn.addEventListener("click", closeModal)

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })
}

function openCharacterModal(character) {
  currentCharacter = character
  currentAudioIndex = 0

  const imageUrl = character.photos && character.photos.length > 0 ? character.photos[0].url : "default.png";

  const modal = document.getElementById("characterModal")

  modal.style.backgroundImage = `url(${character.game.photoUrl})`;
  

  // Preencher informações
  document.getElementById("modalName").textContent = character.name
  document.getElementById("modalType").textContent = character.typeAnimatronic.name
  document.getElementById("modalImage").src = character.photos && character.photos.length > 0 ? character.photos[0].url : "default.png";
  document.getElementById("modalDescription").textContent = character.description

  // Carrossel de fotos
  renderPhotoCarousel()

  // Carrossel de áudios
  if (character.audios && character.audios.length > 0) {
    document.getElementById("audioSection").style.display = "block"
    document.getElementById("noAudioMessage").style.display = "none"
    renderAudioCarousel()
  } else {
    document.getElementById("audioSection").style.display = "none"
    document.getElementById("noAudioMessage").style.display = "block"
  }

  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  const modal = document.getElementById("characterModal")
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
  playClickSound("audios/close.ogg")
}

// Carrossel de fotos
let currentPhotoIndex = 0;
let autoSlideInterval;
let isPaused = false;

function renderPhotoCarousel() {
  const mainPhoto = document.getElementById("mainPhoto");
  const thumbnailsContainer = document.getElementById("thumbnails");
  thumbnailsContainer.innerHTML = "";

  if (!currentCharacter.photos || currentCharacter.photos.length === 0) {
    mainPhoto.src = "";
    mainPhoto.alt = "Sem fotos disponíveis";
    return;
  }

  currentCharacter.photos.forEach((photo, index) => {
    const thumb = document.createElement("div");
    thumb.classList.add("thumbnail");
    if (index === currentPhotoIndex) thumb.classList.add("active");

    thumb.innerHTML = `<img src="${photo.url}" alt="Miniatura ${index + 1}">`;

    thumb.addEventListener("click", () => {
      // Se clicar na mesma miniatura, alterna entre pausar e retomar
      if (index === currentPhotoIndex && isPaused) {
        startAutoSlide();
        isPaused = false;
      } else {
        currentPhotoIndex = index;
        updateMainPhoto();
        stopAutoSlide();
        isPaused = true;
      }
    });

    thumbnailsContainer.appendChild(thumb);
  });

  updateMainPhoto();
  startAutoSlide();
}

function updateMainPhoto() {
  const mainPhoto = document.getElementById("mainPhoto");
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((t, i) => t.classList.toggle("active", i === currentPhotoIndex));
  mainPhoto.style.opacity = 0;
  setTimeout(() => {
    mainPhoto.src = currentCharacter.photos[currentPhotoIndex].url;
    mainPhoto.style.opacity = 1;
  }, 200);
}

function startAutoSlide() {
  stopAutoSlide(); // Evita duplicar intervalos
  autoSlideInterval = setInterval(() => {
    currentPhotoIndex = (currentPhotoIndex + 1) % currentCharacter.photos.length;
    updateMainPhoto();
  }, 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}


// Carrossel de áudios
function renderAudioCarousel() {
  const carousel = document.getElementById("audioCarousel");
  carousel.innerHTML = "";

  if (!currentCharacter.audios || currentCharacter.audios.length === 0) {
    carousel.innerHTML = "<p>Sem áudios disponíveis</p>";
    return;
  }

  currentCharacter.audios.forEach((audio) => {
    const audioItem = document.createElement("div");
    audioItem.className = "audio-item";

    audioItem.innerHTML = `
      <div class="audio-container"> <div class="audio-player">
        <div class="audio-info">
          <h3>${audio.name || 'Áudio sem nome'}</h3>
          <p>${audio.description || 'Sem descrição disponível'}</p>
        </div>

        <div class="controls">
          <button class="play-btn">
            <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg class="pause-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>          
        </div>

      </div>
        <audio src="${audio.url}"></audio>
        <div class="progress-container">
            <div class="progress-bar"></div>
          </div>
      </div>
    `;


    carousel.appendChild(audioItem);

    const playBtn = audioItem.querySelector(".play-btn");
    const audioEl = audioItem.querySelector("audio");
    const progressBar = audioItem.querySelector(".progress-bar");

    playBtn.addEventListener("click", () => {
      if (audioEl.paused) {
        audioEl.play();
        playBtn.classList.add("playing");
      } else {
        audioEl.pause();
        playBtn.classList.remove("playing");
      }
    });

    audioEl.addEventListener("ended", () => {
      playBtn.classList.remove("playing");
      progressBar.style.width = "0%";
    });

    // atualiza a barra de progresso enquanto toca
    audioEl.addEventListener("timeupdate", () => {
      const percent = (audioEl.currentTime / audioEl.duration) * 100;
      progressBar.style.width = percent + "%";
    });
  });
}

// Busca
function initializeSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (query.length < 2) {
      searchResults.classList.remove("active");
      return;
    }

    const results = [];

    // Buscar Jogos
    games.forEach((game, gameIndex) => {
      if (game.name.toLowerCase().includes(query)) {
        results.push({
          type: "game",
          text: game.name,
          action: () => scrollToGame(gameIndex),
        });
      }
    });

    // Buscar Personagens
    animatronics.forEach((character) => {
      const nameMatch = character.name.toLowerCase().includes(query);
      if (nameMatch) {
        const gameIndex = games.findIndex((g) => g.id === character.game.id);
        const gameName = games[gameIndex]?.name || "Jogo desconhecido";

        results.push({
          type: "character",
          text: `${character.name} (${gameName})`,
          action: () => {
            if (gameIndex !== -1) {
              scrollToGame(gameIndex);
            }
            setTimeout(() => openCharacterModal(character), 500);
          },
        });
      }
    });

    renderSearchResults(results);
  });
}


function renderSearchResults(results) {
  const searchResults = document.getElementById("searchResults")

  if (results.length === 0) {
    searchResults.classList.remove("active")
    return
  }

  searchResults.innerHTML = ""
  results.forEach((result) => {
    const tag = document.createElement("div")
    tag.className = `search-tag ${result.type}`
    tag.textContent = result.text
    tag.addEventListener("click", () => {
      result.action()
      searchResults.classList.remove("active")
      document.getElementById("searchInput").value = ""
    })
    searchResults.appendChild(tag)
  })

  searchResults.classList.add("active")
}

// Navegação
function scrollToGame(index) {
  const gameSection = document.querySelectorAll(".game-section")[index]
  if (gameSection) {
    gameSection.scrollIntoView({ behavior: "smooth" })
  }

  // Atualizar navegação ativa
  document.querySelectorAll(".nav-item").forEach((item, i) => {
    item.classList.toggle("active", i === index)
  })
}

function scrollToGames() {

  const firstGame = document.querySelector(".game-section");
  if (!firstGame) return;

  // Scroll suave
  firstGame.scrollIntoView({ behavior: "smooth" });
}

// Animação de scroll tipo YouTube Shorts
function initializeScrollAnimation() {
  const gamesContainer = document.getElementById("gamesContainer")

  gamesContainer.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".game-section")
    const scrollPosition = gamesContainer.scrollTop

    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - gamesContainer.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop - sectionHeight / 2 && scrollPosition < sectionTop + sectionHeight / 2) {
        currentGameIndex = index
        updateActiveNav(index)
      }
    })
  })
}

function updateActiveNav(index) {
  document.querySelectorAll(".nav-item").forEach((item, i) => {
    item.classList.toggle("active", i === index)
  })
}

// Atalhos de teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()
  }
})

async function loadAPIFNaF() {

  try {

    // Carrega com os animatronics
    const response = await fetch("http://localhost:8080/apiFNAF/animatronics")
    const data = await response.json()

    data.forEach(animatronic => {
      animatronics.push(animatronic)
    })

    //Carrega com os games
    const response2 = await fetch("http://localhost:8080/apiFNAF/games")
    const data2 = await response2.json()

    data2.forEach(game => {
      games.push(game)
    })

  } catch (error) {
    console.error("Erro ao carregar os dados:", error)
  }
}

// Inicia o jogo
document.addEventListener("DOMContentLoaded", async () => {
  await loadAPIFNaF();

  await initializeSidebar();
  await initializeGames();
  await initializeSearch();
  await initializeModal();
  await initializeScrollAnimation();

  // Agora que tudo foi carregado, pega os elementos
  const playBtn = document.querySelector('.play-btn');
  const audio = document.querySelector('audio');

  if (playBtn && audio) {
    playBtn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        playBtn.classList.add('playing');
      } else {
        audio.pause();
        playBtn.classList.remove('playing');
      }
    });

    audio.addEventListener('ended', () => {
      playBtn.classList.remove('playing');
    });
  }
});

function initializeMusicToggle() {
  const button = document.getElementById("musicToggle");
  const icon = document.getElementById("musicIcon");
  const audio = document.getElementById("backgroundMusic");

  let isPlaying = false;

  button.addEventListener("click", () => {
    if (!isPlaying) {
      audio.play();
      icon.classList.remove("bi-volume-mute-fill");
      icon.classList.add("bi-volume-up-fill");
    } else {
      audio.pause();
      icon.classList.remove("bi-volume-up-fill");
      icon.classList.add("bi-volume-mute-fill");
    }
    isPlaying = !isPlaying;
  });
}

document.addEventListener("DOMContentLoaded", initializeMusicToggle);

