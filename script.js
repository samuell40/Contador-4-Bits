function andComponente(B, A, interruptorValor) {
  if (B === 1 && A === 1 && interruptorValor === 1) {
    return 1;
  } else {
    return 0;
  }
}

function orComponente(B, A, interruptorValor) {
  if (B === 1 || A === 1 || interruptorValor === 1) {
    return 1;
  } else {
    return 0;
  }
}

function calcular() {
  var A = parseInt(document.getElementById("A").value);
  var B = parseInt(document.getElementById("B").value);
  var A_linha = parseInt(document.getElementById("A'").value);
  var B_linha = parseInt(document.getElementById("B'").value);
  var imgElemento = document.getElementById("resultadoImagem");

  if (isNaN(A) || isNaN(B) || isNaN(A_linha) || isNaN(B_linha)) {
    alert("Preencha todos os campos com valores numéricos.");
    return;
  }

  var interruptorValor = parseInt(document.getElementById("interruptor").value); 

  let resultadoAndAB = andComponente(B, A, interruptorValor);

  if (interruptorValor === 1) {
    interruptorValor = 0;
  } else {
    interruptorValor = 1;
  }

  let resultadoAndAB_linha = andComponente(B_linha, A_linha, interruptorValor);

  let resultadoOr = orComponente(resultadoAndAB_linha, resultadoAndAB);

  // Alterar a imagem com base no resultado
  if (resultadoOr === 1) {
    imgElemento.src =
      "Imagens/led_vermelho.png"; // Imagem para "True"
  } else {
    imgElemento.src =
      "Imagens/led_preto.png"; // Imagem para "False"
  }
}
var contadorValor = 0;
var leds = [
  document.getElementById("resultadoImagem1"),
  document.getElementById("resultadoImagem2"),
  document.getElementById("resultadoImagem3"),
  document.getElementById("resultadoImagem4"),
];
var clockInterval; // Variável para armazenar o intervalo do clock
var isClockRunning = false; // Para evitar múltiplas execuções

function atualizarContagem() {
  let binario = contadorValor.toString(2).padStart(4, "0");
  console.log(binario);

  for (let i = 0; i < 4; i++) {
    if (binario[i] === "1") {
      leds[i].src =
        "Imagens/led_vermelho.png";
    } else {
      leds[i].src =
        "Imagens/led_preto.png";
    }
  }
}

function incrementar() {
  if (contadorValor < 15) {
    contadorValor++;
    atualizarContagem();
  } else {
    stopClock();
  }
}

function decrementar() {
  if (contadorValor > 0) {
    contadorValor--;
    atualizarContagem();
  } else {
    stopClock();
  }
}
function atualizar() {
  var interruptorValor = parseInt(document.getElementById("interruptor").value);
  var interruptorMetodo = parseInt(document.getElementById("metodo").value);
  
  stopClock();
  if (interruptorMetodo === 1) {
    if (interruptorValor === 1) {
      // Modo crescente
      isClockRunning = true;
      clockInterval = setInterval(() => {
        incrementar();
      }, 2000);
    } else if (interruptorValor === 0) {
      // Modo decrescente
      isClockRunning = true;
      clockInterval = setInterval(() => {
        decrementar();
      }, 2000);
    }
  } else {
    if (interruptorValor === 1) {
      incrementar();
    } else {
      decrementar();
    }
  }  
}

// Função para parar o clock antes de iniciar um novo
function stopClock() {
  clearInterval(clockInterval);
  isClockRunning = false;
}


document.getElementById("interruptor").addEventListener("change", alterarModo);
// Função para atualizar os leds conforme o modo selecionado
function alterarModo() {
  var interruptorValor = parseInt(document.getElementById("interruptor").value);

  if (interruptorValor === 1) {
    contadorValor = 0; 
    leds.forEach((led) => {
      led.src =
        "Imagens/led_preto.png";
    });
  } else {
    contadorValor = 15; 
    leds.forEach((led) => {
      led.src =
        "Imagens/led_vermelho.png";
    });
  }

  atualizarContagem();
}

// Função para atualizar imagens e leds 
function atualizarInterface() {
  var interruptorMetodo = parseInt(document.getElementById("metodo").value);
  var interruptorValor = parseInt(document.getElementById("interruptor").value);
  var imgElemento = document.getElementById("circuitoImagem");

  document.getElementById("tooltipsSincrono").style.display = "none";
  document.getElementById("tooltipsAssincrono").style.display = "none";

  // Atualiza a imagem do circuito 
  if (interruptorMetodo === 1) {
    imgElemento.src = "Imagens/2.png";
    document.getElementById("tooltipsSincrono").style.display = "block";
  } else {
    imgElemento.src = "Imagens/3.png";
    document.getElementById("tooltipsAssincrono").style.display = "block";
  }

  if (interruptorValor === 1) {
    contadorValor = 0; 
  } else {
    contadorValor = 15;
  }

  atualizarContagem(); 

  if (interruptorMetodo === 1) {
    console.log("Modo Síncrono selecionado, ajustando LEDs...");
  }
}

document.getElementById("interruptor").addEventListener("change", atualizarInterface);
document.getElementById("metodo").addEventListener("change", atualizarInterface);