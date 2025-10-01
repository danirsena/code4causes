const stats = document.querySelectorAll('.stat');

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