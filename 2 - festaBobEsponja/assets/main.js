import { efeitosDoConvite, modalConvite } from "./js/efeitosConvite.js";

document.addEventListener('DOMContentLoaded', () => {
    
    efeitosDoConvite();

    document.getElementById('sim').addEventListener('click', () => modalConvite('sim'));
    document.getElementById('nao').addEventListener('click', () => modalConvite('nao'));
});