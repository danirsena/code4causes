export function efeitosDoConvite() {
    const sim = document.querySelector('#sim');
    const nao = document.querySelector('#nao');
    const convite = document.querySelector('#bob');
    const imgSim = document.getElementById('imgSim');
    const imgNao = document.getElementById('imgNao');

    sim.addEventListener('mouseenter', () => {
        convite.src = 'assets/media/imagens/SIM.gif';
        imgSim.style.display = "block"; // mostra a imagem
    });
    sim.addEventListener('mouseleave', () => {
        convite.src = 'assets/media/imagens/bobs.png';
        imgSim.style.display = "none"; // esconde a imagem
    });

    nao.addEventListener('mouseenter', () => {
        convite.src = 'assets/media/imagens/NAO.gif';
        imgNao.style.display = "block"; // mostra a imagem
    });
    nao.addEventListener('mouseleave', () => {
        convite.src = 'assets/media/imagens/bobs.png';
        imgNao.style.display = "none";
    });
}

export function modalConvite(resposta) {
    const modal = document.getElementById("modal");
    const modal_content = document.getElementById("modal_content");
    const h2 = document.getElementById("modal_title");

    modal.style.display = "flex";

    if (resposta == 'sim') {
        modal_content.style.backgroundImage = "url('../2 - festaBobEsponja/assets/media/imagens/good_end.gif')";
        h2.textContent = "EBA!";

    } else if (resposta == 'nao') {
        modal_content.style.backgroundImage = "url('../2 - festaBobEsponja/assets/media/imagens/bad_end.gif')";
        h2.textContent = "Tudo bem então :(";
    }
}