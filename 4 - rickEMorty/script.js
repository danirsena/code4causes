// API Configuration
const API_BASE = "https://rickandmortyapi.com/api/character"
let currentPage = 1
let allCharacters = []
let filteredCharacters = []
let isLoading = false

// DOM Elements
const characterGrid = document.getElementById("characterGrid")
const loadingSpinner = document.getElementById("loadingSpinner")
const loadMoreBtn = document.getElementById("loadMoreBtn")
const searchInput = document.getElementById("searchInput")
const randomBtn = document.getElementById("randomBtn")
const heroRandomBtn = document.getElementById("heroRandomBtn")
const themeToggle = document.getElementById("themeToggle")
const clearFiltersBtn = document.getElementById("clearFilters")
const modal = document.getElementById("modal")
const modalClose = document.getElementById("modalClose")
const speciesSelect = document.getElementById("speciesSelect")

// Sound effects (using Web Audio API for simple sounds)
const audioContext = new (window.AudioContext || window.webkitAudioContext)()

function playSound(frequency = 440, duration = 100) {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration / 1000)
}

// Fetch characters from API
async function fetchCharacters(page = 1) {
    if (isLoading) return

    isLoading = true
    loadingSpinner.style.display = "block"

    try {
        const response = await fetch(`${API_BASE}?page=${page}`)
        const data = await response.json()

        allCharacters = [...allCharacters, ...data.results]
        filteredCharacters = [...allCharacters]

        renderCharacters(data.results)

        if (data.info.next) {
            loadMoreBtn.style.display = "block"
        } else {
            loadMoreBtn.style.display = "none"
        }

        currentPage = page
    } catch (error) {
        console.error("Error fetching characters:", error)
        characterGrid.innerHTML =
            '<p style="text-align: center; color: var(--text-secondary);">Error loading characters. Please try again.</p>'
    } finally {
        isLoading = false
        loadingSpinner.style.display = "none"
    }
}

// Render characters to grid
function renderCharacters(characters, append = true) {
    if (!append) {
        characterGrid.innerHTML = ""
    }

    if (characters.length === 0 && !append) {
        characterGrid.innerHTML =
            '<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">Não há nenhum personagem no multiverso com essas características. Tente ajustar seus filtros.</p><p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">'
        return
    }

    characters.forEach((character) => {
        const card = createCharacterCard(character)
        characterGrid.appendChild(card)
    })
}

// Create character card element
function createCharacterCard(character) {
    const card = document.createElement("div")
    card.className = `character-card ${character.gender.toLowerCase()}`
    card.dataset.characterId = character.id

    const statusIcon = getStatusIcon(character.status)

    card.innerHTML = `
        <div class="card-id">#${character.id}</div>
        <div class="card-image-container">
            <img src="${character.image}" alt="${character.name}" class="card-image">
            <div class="status-badge">${statusIcon}</div>
        </div>
        <div class="card-info">
            <h3 class="card-name">${character.name}</h3>
            <p class="card-detail"><strong>Species:</strong> ${character.species}</p>
            <p class="card-detail"><strong>Status:</strong> ${character.status}</p>
            <p class="card-detail"><strong>Location:</strong> ${character.location.name}</p>
        </div>
    `

    card.addEventListener("click", () => openModal(character))

    return card
}

// Get status icon
function getStatusIcon(status) {
    switch (status.toLowerCase()) {
        case "alive":
            return "❤️"
        case "dead":
            return "☠️"
        default:
            return "❓"
    }
}

// Open modal with character details
function openModal(character) {
    playSound(600, 150)

    document.getElementById("modalImage").src = character.image
    document.getElementById("modalName").textContent = character.name
    document.getElementById("modalStatus").textContent = `${getStatusIcon(character.status)} ${character.status}`
    document.getElementById("modalSpecies").textContent = character.species
    document.getElementById("modalGender").textContent = character.gender
    document.getElementById("modalOrigin").textContent = character.origin.name
    document.getElementById("modalLocation").textContent = character.location.name

    // Set modal background based on status
    const modalContent = document.querySelector(".modal-content")
    if (character.status.toLowerCase() === "alive") {
        modalContent.style.borderColor = "var(--status-alive)"
    } else if (character.status.toLowerCase() === "dead") {
        modalContent.style.borderColor = "var(--status-dead)"
    } else {
        modalContent.style.borderColor = "var(--status-unknown)"
    }

    modal.classList.add("active")
    document.body.style.overflow = "hidden"
}

// Close modal
function closeModal() {
    playSound(400, 100)
    modal.classList.remove("active")
    document.body.style.overflow = "auto"
}

// Apply filters
function applyFilters() {
    const statusFilters = Array.from(document.querySelectorAll('input[name="status"]:checked')).map((cb) => cb.value)
    const genderFilters = Array.from(document.querySelectorAll('input[name="gender"]:checked')).map((cb) => cb.value)
    const speciesFilter = speciesSelect.value.toLowerCase()
    const searchTerm = searchInput.value.toLowerCase()

    filteredCharacters = allCharacters.filter((character) => {
        const matchesStatus = statusFilters.length === 0 || statusFilters.includes(character.status.toLowerCase())
        const matchesGender = genderFilters.length === 0 || genderFilters.includes(character.gender.toLowerCase())
        const matchesSpecies = !speciesFilter || character.species.toLowerCase().includes(speciesFilter)
        const matchesSearch = !searchTerm || character.name.toLowerCase().includes(searchTerm)

        return matchesStatus && matchesGender && matchesSpecies && matchesSearch
    })

    renderCharacters(filteredCharacters, false)
}

// Clear all filters
function clearFilters() {
    document.querySelectorAll('input[type="checkbox"]').forEach((cb) => (cb.checked = false))
    speciesSelect.value = ""
    searchInput.value = ""
    filteredCharacters = [...allCharacters]
    renderCharacters(filteredCharacters, false)
    playSound(500, 100)
}

// Random character
async function showRandomCharacter() {
    playSound(700, 200)
    const randomId = Math.floor(Math.random() * 826) + 1 // Rick and Morty API has 826 characters

    try {
        const response = await fetch(`${API_BASE}/${randomId}`)
        const character = await response.json()
        openModal(character)
    } catch (error) {
        console.error("Error fetching random character:", error)
    }
}

// Theme toggle
function toggleTheme() {
    const body = document.body
    const themeLua = document.getElementById("theme-moon")
    const themeSol = document.getElementById("theme-sun")

    if (body.classList.contains("light-theme")) {
        body.classList.remove("light-theme")
        body.classList.add("dark-theme")
        themeLua.style.display = "none"
        themeSol.style.display = "block"
        localStorage.setItem("theme", "dark")
    } else {
        body.classList.remove("dark-theme")
        body.classList.add("light-theme")
        localStorage.setItem("theme", "light")
        themeLua.style.display = "block"
        themeSol.style.display = "none"
    }

    playSound(550, 100)
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light"
    const body = document.body
    const themeLua = document.getElementById("theme-moon")
    const themeSol = document.getElementById("theme-sun")

    if (savedTheme === "dark") {
        body.classList.remove("light-theme")
        body.classList.add("dark-theme")
        themeLua.style.display = "none"
        themeSol.style.display = "block"
    } else {
        body.classList.remove("dark-theme")
        body.classList.add("light-theme")
        themeLua.style.display = "block"
        themeSol.style.display = "none"
    }
}

// Event Listeners
loadMoreBtn.addEventListener("click", () => {
    fetchCharacters(currentPage + 1)
    playSound(500, 100)
})

searchInput.addEventListener("input", applyFilters)

document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
        applyFilters()
        playSound(450, 80)
    })
})

speciesSelect.addEventListener("change", () => {
    applyFilters()
    playSound(450, 80)
})

clearFiltersBtn.addEventListener("click", clearFilters)

randomBtn.addEventListener("click", showRandomCharacter)

heroRandomBtn.addEventListener("click", showRandomCharacter)

themeToggle.addEventListener("click", toggleTheme)

modalClose.addEventListener("click", closeModal)

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal()
    }
})

// Initialize
loadTheme()
fetchCharacters(1)