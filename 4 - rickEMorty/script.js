
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const cardsContainer = document.getElementById('cardsContainer');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');
const searchInput = document.getElementById('searchInput');
const randomBtn = document.getElementById('randomBtn');

let characters = [];
const pages = [1, 7, 13, 20, 25, 39];

// Função para buscar dados (adicione seu fetch depois)
async function fetchCharacters() {
    try {
        let allCharacters = [];
        for (let page of pages) {
            const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
            const data = await res.json();
            allCharacters.push(...data.results);
        }
        characters = allCharacters;
        renderCards(characters);
    } catch (err) {
        console.error(err);
    }
}

function renderCards(list) {
    cardsContainer.innerHTML = ''; // limpa antes
    list.forEach(char => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
        <span class="id">${char.id}</span>
        <p class="hidden">${char.episode}</p>
            <img src="${char.image}" alt="${char.name}">
            <h3>${render_gender(char.gender)} ${char.name} </h3>
            <p>Espécie: ${char.species}</p>
           ${render_status(char.status)}
        `;
        card.addEventListener('click', () => openModal(char));
        cardsContainer.appendChild(card);
    });
}

function render_gender(gender) {
    if (gender === 'Male') return '<i class="bi bi-gender-male"></i>';
    if (gender === 'Female') return '<i class="bi bi-gender-female"></i>';
    return '<i class="bi bi-question"></i>';
}

function render_status(status) {

    status_result = "<p>Status: ";

    if (status === 'Alive') status_result += '<i class="bi bi-check-lg" style="color: green;"></i>';
    if (status === 'Dead') status_result += '💀';
    if (status === 'unknown') status_result += '<i class="bi bi-question"></i>';

    return status_result + "</p>";
}

async function openModal(character) {
    modalContent.innerHTML = `
        <span class="modal-close" id="modalClose">&times;</span>
        <img src="${character.image}" alt="${character.name}">
        <div class="modal-text"><h2> ${character.id} - ${character.name}</h2>
        <p><strong>Status:</strong> ${character.status}</p>
        <p><strong>Espécie:</strong> ${character.species}</p>
        <p><strong>Tipo:</strong> ${character.type ? character.type : 'Desconhecido'}</p>
        <p><strong>Gênero:</strong> ${character.gender}</p>
        <p><strong>Origem:</strong> ${character.origin.name === 'unknown' ? 'Desconhecida' : character.origin.name}</p>
        <p><strong>Localização:</strong> ${character.location.name === 'unknown' ? 'Desconhecida' : character.location.name}</p>
        <p><strong>Primeira aparição:</strong> ${await get_episode(character.episode[0])}</p></div>
    `;
    document.getElementById('modalClose').addEventListener('click', closeModal);
    modal.classList.add('active');
}

async function get_episode(url) {

    let episode = "aguardando...";
    let episodio = await fetch(url);
    let episodio_json = await episodio.json();

    episode = episodio_json.episode + " (Episódio " + episodio_json.id + ") - " + episodio_json.name;

    return episode;
}

function closeModal() {
    modal.classList.remove('active');
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Tema claro/escuro
themeToggle.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Pesquisa
searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    const filtered = characters.filter(c =>
        c.id.toString().includes(term)
        || c.name.toLowerCase().includes(term)
        || c.species.toLowerCase().includes(term)
        || c.status.toLowerCase().includes(term)
        || c.gender.toLowerCase().includes(term)
        || c.type.toLowerCase().includes(term)
    );
    renderCards(filtered);
});

// Sortear personagem
randomBtn.addEventListener('click', () => {
    if (characters.length === 0) return;
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    openModal(randomChar);
});

fetchCharacters();