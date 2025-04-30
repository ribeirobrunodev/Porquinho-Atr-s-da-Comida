let jogoAtivo = false;
let pontuacao = 0;
let intervaloObstaculo;
let intervaloTempo;
let segundos = 0;

function iniciarJogo() {
  if (jogoAtivo) return;
  jogoAtivo = true;
  pontuacao = 0;
  segundos = 0;

  document.getElementById("pontuacao").innerText = pontuacao;
  document.getElementById("relogio").innerText = "00";
  document.getElementById("btnIniciar").style.display = "none";
  document.getElementById("btnReiniciar").style.display = "none";
  document.getElementById("gameOver").style.display = "none";

  const ovo = document.getElementById("ovo");
  let duracaoAnimacao = window.innerWidth <= 768 ? 0.9 : 1.2;
  ovo.style.animation = `moverOvo ${duracaoAnimacao}s linear infinite`;

  intervaloTempo = setInterval(() => {
    segundos++;
    const minutos = String(Math.floor(segundos / 60)).padStart(2, '0');
    const seg = String(segundos % 60).padStart(2, '0');
    document.getElementById("relogio").innerText = `${minutos}:${seg}`;
  }, 1000);

  intervaloObstaculo = setInterval(() => {
    const pintinho = document.getElementById("pintinho");
    const pTop = pintinho.getBoundingClientRect().top;
    const pBottom = pintinho.getBoundingClientRect().bottom;
    const oLeft = ovo.getBoundingClientRect().left;
    const oRight = ovo.getBoundingClientRect().right;

    const colisao = oLeft < (pintinho.offsetLeft + pintinho.offsetWidth) &&
                    oRight > pintinho.offsetLeft &&
                    pBottom >= window.innerHeight - 60;

    if (colisao) {
      jogoAtivo = false;

      document.getElementById("somGameOver").play();
      ovo.style.animation = "none";
      ovo.style.right = "-40px";
      clearInterval(intervaloObstaculo);
      clearInterval(intervaloTempo);

      pintinho.style.backgroundImage = "url('./imagem/esqueleto.gif')";
      ovo.style.backgroundImage = "url('ovo-quebrado.png')";

      document.getElementById("gameOver").style.display = "block";
      document.getElementById("btnReiniciar").style.display = "inline";
    }
  }, 10);
}

function reiniciarJogo() {
  const pintinho = document.getElementById("pintinho");
  const ovo = document.getElementById("ovo");

  pintinho.style.backgroundImage = "url('./imagem/pig-418_512.gif')";
  ovo.style.backgroundImage = "url('./imagem/2.gif')";
  ovo.style.right = "-40px";
  ovo.style.animation = "none";

  document.getElementById("pontuacao").innerText = "0";
  document.getElementById("relogio").innerText = "00";
  document.getElementById("gameOver").style.display = "none";
  document.getElementById("btnIniciar").style.display = "inline";
  document.getElementById("btnReiniciar").style.display = "none";

  jogoAtivo = false;
  pontuacao = 0;
  segundos = 0;
}

function pular() {
  if (jogoAtivo) {
    const pintinho = document.getElementById("pintinho");
    if (!pintinho.classList.contains("pular")) {
      document.getElementById("somPulo").play();
      pintinho.classList.add("pular");

      // Soma ponto a cada pulo
      pontuacao++;
      document.getElementById("pontuacao").innerText = pontuacao;

      setTimeout(() => pintinho.classList.remove("pular"), 600);
    }
  }
}

function handleBtnPulo() {
  const larguraTela = window.innerWidth;

  if (!jogoAtivo && larguraTela <= 768) {
    iniciarJogo();
    document.getElementById("btnIniciar").style.display = "none";
    document.getElementById("btnReiniciar").style.display = "none";
  }

  pular();
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && jogoAtivo) {
    const pintinho = document.getElementById("pintinho");
    if (!pintinho.classList.contains("pular")) {
      document.getElementById("somPulo").play();
      pintinho.classList.add("pular");

      // Soma ponto ao pular com teclado
      pontuacao++;
      document.getElementById("pontuacao").innerText = pontuacao;

      setTimeout(() => pintinho.classList.remove("pular"), 600);
    }
  }
});

document.addEventListener("touchstart", (e) => {
  const isButton = e.target.closest("#btnPulo, #btnIniciar, #btnReiniciar");
  if (!isButton) {
    handleBtnPulo();
  }
});
