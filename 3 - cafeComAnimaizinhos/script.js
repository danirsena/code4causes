// 1. Modal do formulário

function openModal() {
    overlay.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeModal() {
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// 2. Animação dos checklists da section "evento"

const section = document.querySelector("#evento");
const checklist = section.querySelector(".checklist-fofo");

const observer_checklist = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove e reaplica a animação para reiniciá-la
            checklist.style.animation = "none";
            checklist.offsetHeight; // força reflow (reinicia o CSS)
            checklist.style.animation = "aparecerSuave 0.8s ease-out forwards";
        }
    });
}, { threshold: 0.3 });

observer_checklist.observe(section);

// 3. Animações da section "quem somos"
function animateNumber(stat) {
    const numberEl = stat.querySelector('.number');
    const target = +stat.getAttribute('data-target');
    let count = 0;
    const increment = Math.ceil(target / 100);

    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            numberEl.textContent = "+" + target;
            clearInterval(interval);
        } else {
            numberEl.textContent = "+" + count;
        }
    }, 20);
}

const stats = document.querySelectorAll('.stat');

//variáveis do modal
const openBtn = document.getElementById('open-modal');
const overlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModal');

const options = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const stat = entry.target;
        if (entry.isIntersecting) {
            stat.classList.add('visible');
            animateNumber(stat);
        } else {
            // quando sai da tela, reseta
            stat.classList.remove('visible');
            stat.querySelector('.number').textContent = '0';
        }
    });
}, options);

stats.forEach(stat => observer.observe(stat));

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

// Fechar clicando fora do modal
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
});

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

//carrossel depoimentos
document.addEventListener('DOMContentLoaded', function () {
    const carrossel = document.querySelector('.carrossel');
    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const indicadores = document.querySelectorAll('.indicador');

    let currentIndex = 0;
    const totalSlides = slides.length;

    //Atualiza o carrossel
    function updateCarrossel() {
        carrossel.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Atualiza os indicadores
        indicadores.forEach((indicador, index) => {
            if (index === currentIndex) {
                indicador.classList.add('ativo');
            } else {
                indicador.classList.remove('ativo');
            }
        });
    }

    //Botões
    btnNext.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarrossel();
    });


    btnPrev.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarrossel();
    });

    // Evento para os indicadores
    indicadores.forEach(indicador => {
        indicador.addEventListener('click', function () {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateCarrossel();
        });
    });

    // Opção de Auto-play
    let autoPlay = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarrossel();
    }, 5000);

    // Pausar auto-play ao interagir
    carrossel.addEventListener('mouseenter', () => {
        clearInterval(autoPlay);
    });

    carrossel.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarrossel();
        }, 5000);
    });
});