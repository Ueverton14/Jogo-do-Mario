// Seleciona os elementos principais do jogo no HTML
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.cloud');

// Elementos para mostrar a tela de game over e o botão de reiniciar
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');

// Função que faz o Mario pular
const jump = () => {
    mario.classList.add('jump'); // Adiciona a animação de pulo

    // Remove a animação após 500ms para que ele possa pular novamente
    setTimeout(() => {
        mario.classList.remove('jump');
    }, 500);
}

// Loop principal do jogo, verifica colisões a cada 10ms
const loop = setInterval(() => {
    // Pega a posição atual dos elementos na tela
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

    // Verifica se houve colisão entre o Mario e o cano
    if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
        // Para a animação do cano e mantém sua posição atual
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        // Para a animação do Mario e mantém sua posição atual
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // Troca o sprite do Mario para o de "Game Over"
        mario.src = 'assets/imgs/game-over.png';
        mario.style.width = '70px';
        mario.style.marginLeft = '35px';

        // Mantém as nuvens se movendo e salva a posição atual
        cloud.style.animation = 'cloud 20s infinite linear';
        cloud.style.left = `${cloudPosition}px`;

        // Mostra a mensagem de Game Over
        gameOver.style.visibility = 'visible';

        // Para o loop do jogo
        clearInterval(loop);
    }
}, 10);

// Função chamada ao clicar no botão de reiniciar
const restart = () => {
    gameOver.style.visibility = 'hidden'; // Esconde a tela de game over

    // Reinicia a animação do cano
    pipe.style.animation = 'pipe-animations 1.5s infinite linear';
    pipe.style.left = ``;

    // Volta o Mario ao estado inicial (vivo e maior)
    mario.src = 'assets/imgs/mario.gif';
    mario.style.width = '130px';
    mario.style.bottom = '0px';
    mario.style.marginLeft = '';
    mario.style.animation = '';

    // Reinicia a posição da nuvem
    cloud.style.left = ``;

    // Inicia um novo loop (atenção: pode acumular vários loops se não for tratado corretamente)
    const loop = setInterval(() => {
        const pipePosition = pipe.offsetLeft;
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        const cloudPosition = +window.getComputedStyle(cloud).left.replace('px', '');

        if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 60) {
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            mario.style.animation = 'none';
            mario.style.bottom = `${marioPosition}px`;

            mario.src = 'assets/imgs/game-over.png';
            mario.style.width = '70px';
            mario.style.marginLeft = '35px';

            cloud.style.animation = 'cloud 20s infinite linear';
            cloud.style.left = `${cloudPosition}px`;

            gameOver.style.visibility = 'visible';

            clearInterval(loop);
        }
    }, 10);
}

// Detecta quando o jogador pressiona uma tecla ou toca na tela para pular
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

// Ativa o botão de reiniciar
restartButton.addEventListener('click', restart);
