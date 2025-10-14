// Estado global
let currentPhotoIndex = 0
let currentAudioIndex = 0
let currentCharacter = null
let currentGameIndex = 0

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
  const card = document.createElement("div")
  card.className = "character-card"

  const imageUrl = character.photos && character.photos.length > 0 ? character.photos[0].url : "default.png";

  card.innerHTML = `
        <img src="${imageUrl}" alt="${character.name}" class="character-img">
        <h3>${character.name}</h3>
        <span class="character-type">${character.typeAnimatronic.name}</span>
    `

  card.addEventListener("click", () => {
    playClickSound("audios/monitor.ogg")
    openCharacterModal(character)
  })

  return card
}

// Som de clique (simulado)
function playClickSound(audioUrl) {

  const audio = new Audio(audioUrl)
  audio.play()
  //executa uma vez

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
  currentPhotoIndex = 0
  currentAudioIndex = 0

  const imageUrl = character.photos && character.photos.length > 0 ? character.photos[0].url : "default.png";

  const modal = document.getElementById("characterModal")

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
function renderPhotoCarousel() {
  const carousel = document.getElementById("photoCarousel")
  if (!currentCharacter.photos || currentCharacter.photos.length === 0) {
    carousel.innerHTML = `<p>Sem fotos disponíveis</p>`
    return
  }
  const photoUrl = currentCharacter.photos[currentPhotoIndex].url
  carousel.innerHTML = `<img src="${photoUrl}" alt="Foto ${currentPhotoIndex + 1}">`
}

function changePhoto(direction) {
  if (!currentCharacter.photos || currentCharacter.photos.length === 0) return
  const totalPhotos = currentCharacter.photos.length
  currentPhotoIndex = (currentPhotoIndex + direction + totalPhotos) % totalPhotos
  renderPhotoCarousel()
}

// Carrossel de áudios
function renderAudioCarousel() {
  const carousel = document.getElementById("audioCarousel")
  carousel.innerHTML = ""

  if (!currentCharacter.audios || currentCharacter.audios.length === 0) {
    carousel.innerHTML = "<p>Sem áudios disponíveis</p>"
    return
  }

  currentCharacter.audios.forEach((audio, index) => {
    const audioItem = document.createElement("div")
    audioItem.className = "audio-item"
    audioItem.innerHTML = `
            <span>${audio.name}</span>
            <audio controls>
                <source src="${audio.url}" type="audio/mpeg">
                Seu navegador não suporta áudio.
            </audio>
        `
    carousel.appendChild(audioItem)
  })
}

function changeAudio(direction) {

}

// Busca
function initializeSearch() {
  const searchInput = document.getElementById("searchInput")
  const searchResults = document.getElementById("searchResults")

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim()

    if (query.length < 2) {
      searchResults.classList.remove("active")
      return
    }

    const results = []

    // Buscar jogos
    games.forEach((game, gameIndex) => {
      if (game.name.toLowerCase().includes(query)) {
        results.push({
          type: "game",
          text: game.name,
          action: () => scrollToGame(gameIndex),
        })
      }

      // Buscar personagens
      animatronics.forEach((character) => {
        if (character.name.toLowerCase().includes(query)) {
          results.push({
            type: "character",
            text: `${character.name} (${game.name})`,
            action: () => {
              scrollToGame(gameIndex)
              setTimeout(() => openCharacterModal(character), 500)
            },
          })
        }
      })
    })

    renderSearchResults(results)
  })
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

  await loadAPIFNaF()

  initializeSidebar()
  initializeGames()
  initializeSearch()
  initializeModal()
  initializeScrollAnimation()
})