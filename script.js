let jogadores = [];
let pontuacoes = [];
let indiceJogador = 0;
let indicePergunta = 0;
let indiceDica = 0;

function mostrarCadastro() {
  document.getElementById("tela-inicial").classList.add("hidden");
  document.getElementById("tela-cadastro").classList.remove("hidden");
}

function mostrarRegras() {
  alert("Regras:\n- Cada jogador responde uma pergunta por vez.\n- Até 5 dicas são mostradas.\n- Quanto antes acertar, mais pontos ganha!");
}

function voltarInicio() {
  location.reload();
}

function adicionarJogador() {
  const div = document.createElement("div");
  div.innerHTML = `<input type="text" placeholder="Jogador ${jogadores.length + 3}" required>`;
  document.getElementById("inputs-jogadores").appendChild(div);
}

function iniciarJogo() {
  const inputs = document.querySelectorAll("#inputs-jogadores input");
  jogadores = [];
  pontuacoes = [];
  inputs.forEach(input => {
    if (input.value.trim()) {
      jogadores.push(input.value.trim());
      pontuacoes.push(0);
    }
  });

  if (jogadores.length < 2) {
    alert("Cadastre pelo menos 2 jogadores.");
    return;
  }

  indicePergunta = 0;
  indiceJogador = 0;
  indiceDica = 0;
  carregarPergunta();
}

function carregarPergunta() {
  document.querySelectorAll(".container").forEach(c => c.classList.add("hidden"));
  document.getElementById("tela-jogo").classList.remove("hidden");

  const pergunta = perguntas[indicePergunta];
  document.getElementById("nome-jogador").textContent = `Vez de: ${jogadores[indiceJogador]}`;
  document.getElementById("categoria").textContent = `Categoria: ${pergunta.categoria}`;
  document.getElementById("dica").textContent = `Dica: ${pergunta.dicas[0]}`;
  document.getElementById("resposta").value = "";
  indiceDica = 0;
}

function proximaDica() {
  const pergunta = perguntas[indicePergunta];
  if (indiceDica < pergunta.dicas.length - 1) {
    indiceDica++;
    document.getElementById("dica").textContent = `Dica: ${pergunta.dicas[indiceDica]}`;
  } else {
    alert("Esta foi a última dica.");
  }
}

function verificarResposta() {
  const resposta = document.getElementById("resposta").value.trim().toLowerCase();
  const pergunta = perguntas[indicePergunta];
  const respostasCorretas = pergunta.respostas.map(r => r.toLowerCase());

  let pontos = [10, 8, 6, 4, 2];
  if (respostasCorretas.includes(resposta)) {
    pontuacoes[indiceJogador] += pontos[indiceDica];
    alert("Resposta correta!");
  } else {
    alert(`Resposta errada! Era: ${pergunta.respostas[0]}`);
  }

  mostrarPlacar();
}

function mostrarPlacar() {
  document.querySelectorAll(".container").forEach(c => c.classList.add("hidden"));
  document.getElementById("tela-placar").classList.remove("hidden");

  const placar = document.getElementById("placar");
  placar.innerHTML = "";
  jogadores.forEach((jogador, i) => {
    placar.innerHTML += `<p>${jogador}: ${pontuacoes[i]} pts</p>`;
  });
}

function proximaRodada() {
  indiceJogador = (indiceJogador + 1) % jogadores.length;
  indicePergunta++;

  if (indicePergunta >= perguntas.length) {
    fimDeJogo();
  } else {
    carregarPergunta();
  }
}

function fimDeJogo() {
  document.querySelectorAll(".container").forEach(c => c.classList.add("hidden"));
  document.getElementById("tela-final").classList.remove("hidden");

  const resultado = document.getElementById("placar-final");
  resultado.innerHTML = "";
  jogadores.forEach((j, i) => {
    resultado.innerHTML += `<p>${j}: ${pontuacoes[i]} pts</p>`;
  });

  const maxPonto = Math.max(...pontuacoes);
  const vencedores = jogadores.filter((_, i) => pontuacoes[i] === maxPonto);
  if (vencedores.length === 1) {
    resultado.innerHTML += `<h3>Vencedor: ${vencedores[0]}</h3>`;
  } else {
    resultado.innerHTML += `<h3>Empate entre: ${vencedores.join(", ")}</h3>`;
  }
}

function reiniciar() {
  iniciarJogo();
}
