import { efeitosDoConvite, modalConvite } from "./js/efeitosConvite.js";

document.addEventListener('DOMContentLoaded', () => {

    efeitosDoConvite();

    document.getElementById('sim').addEventListener('click', () => modalConvite('sim'));
    document.getElementById('nao').addEventListener('click', () => modalConvite('nao'));
});

document.addEventListener('DOMContentLoaded', () => {
    // Variável para armazenar o tempo do último movimento do mouse
    let lastBubbleTime = 0;
    const minInterval = 250;

    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();

        // Verifica se já passou tempo suficiente desde a última bolha
        if (currentTime - lastBubbleTime > minInterval) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            const bubbleSize = Math.random() * 20 + 10;
            bubble.style.width = `${bubbleSize}px`;
            bubble.style.height = `${bubbleSize}px`;
            bubble.style.left = `${e.clientX - bubbleSize / 2}px`;
            bubble.style.top = `${e.pageY - bubbleSize / 2}px`;

            document.body.appendChild(bubble);

            bubble.addEventListener('animationend', () => {
                bubble.remove();
            });

            // Atualiza o tempo do último movimento
            lastBubbleTime = currentTime;
        }
    });
});