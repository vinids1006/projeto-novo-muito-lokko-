// ------------------------------
// Dados do Quiz (10 perguntas)
// ------------------------------
const questions = [
  {
    q: "Em que ano o Coritiba Foot Ball Club foi fundado?",
    options: ["1907", "1909", "1910", "1912"],
    correctIndex: 1
  },
  {
    q: "Qual é o apelido tradicional do Coritiba?",
    options: ["Furacão", "Coxa", "Raposa", "Leão"],
    correctIndex: 1
  },
  {
    q: "Qual é o estádio oficial onde o Coritiba manda seus jogos?",
    options: ["Arena da Baixada", "Estádio Couto Pereira", "Vila Capanema", "Durival Britto"],
    correctIndex: 1
  },
  {
    q: "Em que ano o Coritiba conquistou o Campeonato Brasileiro?",
    options: ["1975", "1985", "1995", "2005"],
    correctIndex: 1
  },
  {
    q: "Quais são as cores principais do uniforme do Coritiba?",
    options: ["Verde e branco", "Preto e vermelho", "Azul e branco", "Verde e preto"],
    correctIndex: 0
  },
  {
    q: "Em qual cidade o Coritiba foi fundado?",
    options: ["Londrina", "Maringá", "Curitiba", "Ponta Grossa"],
    correctIndex: 2
  },
  {
    q: "Qual é o maior rival do Coritiba?",
    options: ["Paraná Clube", "Athletico Paranaense", "Operário Ferroviário", "Joinville"],
    correctIndex: 1
  },
  {
    q: "Quem é tradicionalmente citado como maior artilheiro da história do Coritiba?",
    options: ["Sicupira", "Alex", "Duílio Dias", "Krüger"],
    correctIndex: 2
  },
  {
    q: "Em qual ano o Coritiba registrou a famosa sequência recorde de vitórias?",
    options: ["2009", "2010", "2011", "2012"],
    correctIndex: 2
  },
  {
    q: "Qual é a torcida organizada mais conhecida do Coritiba?",
    options: ["Gaviões da Fiel", "Império Alviverde", "Máfia Azul", "Os Fanáticos"],
    correctIndex: 1
  }
];

// ------------------------------
// Elementos da UI
// ------------------------------
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const scoreText = document.getElementById("score-text");
const percentText = document.getElementById("percent-text");

// ------------------------------
// Estado
// ------------------------------
let current = 0;
let score = 0;
let selectedIndex = null;

// ------------------------------
// Fluxo
// ------------------------------
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  current = 0;
  score = 0;
  renderQuestion();
});

nextBtn.addEventListener("click", () => {
  if (selectedIndex === null) return;

  if (selectedIndex === questions[current].correctIndex) {
    score++;
  }

  current++;

  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

// ------------------------------
// Renderização
// ------------------------------
function renderQuestion() {
  selectedIndex = null;
  nextBtn.disabled = true;

  const total = questions.length;
  progressEl.textContent = `Pergunta ${current + 1}/${total}`;

  const { q, options } = questions[current];
  questionEl.textContent = q;

  optionsEl.innerHTML = "";
  options.forEach((text, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn option";
    btn.type = "button";
    btn.textContent = text;
    btn.addEventListener("click", () => selectOption(idx, btn));
    optionsEl.appendChild(btn);
  });
}

function selectOption(idx, btn) {
  selectedIndex = idx;
  // limpar seleção anterior
  [...optionsEl.children].forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  nextBtn.disabled = false;
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  const total = questions.length;
  const percent = Math.round((score / total) * 100);

  scoreText.textContent = `Você acertou ${score} de ${total} perguntas.`;
  percentText.textContent = `Desempenho: ${percent}% de acertos.`;
}
