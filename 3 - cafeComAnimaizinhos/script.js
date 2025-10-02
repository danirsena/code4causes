function openModal() {
    overlay.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeModal() {
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
}

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