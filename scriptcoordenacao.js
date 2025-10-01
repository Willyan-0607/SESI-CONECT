const userId = "Usuário-" + Math.floor(Math.random() * 1000);
const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");

const whatsappNumber = "5511999999999"; // Número real da coordenação

let conversa = [];
let etapa = "inicio";
let dados = {
  nome: "",
  motivo: "",
  outro: ""
};

function addMessage(sender, text, isSystem = false) {
  const message = document.createElement("div");
  message.classList.add("message");

  if (sender === userId) {
    message.classList.add("user-message");
  } else {
    message.classList.add("bot-message");
  }

  if (isSystem) message.classList.add("system");
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;

  conversa.push(`${sender}: ${text}`);
}

function mostrarMenu() {
  addMessage(
    "Coordenação",
    "Como podemos te ajudar hoje? Selecione uma das opções:\n\n1️⃣ Justificativa de ausência\n2️⃣ Contactar diretamente a coordenadora\n3️⃣ Outro",
    true
  );
  etapa = "menu";
}

function iniciarChat() {
  setTimeout(() => {
    addMessage("Coordenação", "👋 Olá! Bem-vindo ao canal oficial da Escola Sesi Wilma Catão Araújo.", true);
  }, 500);

  setTimeout(() => {
    mostrarMenu();
  }, 1500);
}

function enviarParaWhatsapp() {
  // Adiciona os dados coletados ao início da conversa para fácil visualização
  let dadosFormatados = `Dados coletados:\n- Nome: ${dados.nome || 'Não preenchido'}\n- Motivo: ${dados.motivo || 'Não preenchido'}\n- Outro: ${dados.outro || 'Não preenchido'}\n\n`;
  const texto = `Mensagem enviada por ${userId}:\n\n` + dadosFormatados + conversa.join('\n');
  const encodedMsg = encodeURIComponent(texto);
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;
  window.open(whatsappURL, "_blank");
}

function finalizarChat() {
  addMessage("Coordenação", "✅ Obrigado pelo contato. Estamos à disposição! 👋", true);
  etapa = "finalizado";
}

chatForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (!msg) return;

  addMessage(userId, msg);
  chatInput.value = "";

  switch (etapa) {
    case "menu":
      if (msg === "1") {
        addMessage("Coordenação", "✅ Vamos registrar sua justificativa.\nQual é o seu nome completo?", true);
        etapa = "nome";
      } 
      else if (msg === "2") {
        addMessage("Coordenação", "✍️ Descreva seu caso.", true);
        etapa = "descrever_caso_2"; 
      } 
      else if (msg === "3") {
        addMessage("Coordenação", "✍️ Por favor, descreva a situação.", true);
        etapa = "outro_descricao";
      } else {
        addMessage("Coordenação", "❗ Opção inválida. Por favor, escolha 1, 2 ou 3.", true);
      }
      break;

    // --- SEÇÃO MODIFICADA ---
    case "descrever_caso_2":
        dados.outro = msg; // Salva a descrição do caso
        addMessage("Coordenação", "📤 Enviando para coordenação. Aguarde resposta pelo WhatsApp.", true);
        // A LINHA ABAIXO FOI REMOVIDA
        // enviarParaWhatsapp();
        finalizarChat(); // Finaliza o chat diretamente
        break;

    case "nome":
      dados.nome = msg;
      addMessage("Coordenação", `Obrigado, ${msg}. Agora, informe o motivo da justificativa.`, true);
      etapa = "motivo";
      break;

    case "motivo":
      dados.motivo = msg;
      addMessage("Coordenação", "✅ Sua justificativa foi salva! Se seu caso foi doença ou hospitalidade, envie o atestado/declaração para a coordenação escolar. (enviar/não)", true);
      etapa = "confirmarEnvio";
      break;

    case "confirmarEnvio":
      if (msg.toLowerCase().startsWith("e")) { // enviar
        addMessage("Coordenação", "📤 Salvando justificativa...", true);
        enviarParaWhatsapp();
      }
      finalizarChat();
      break;

    case "outro_descricao":
      dados.outro = msg; // Salva a descrição do usuário
      addMessage("Coordenação", "✅ Caso registrado! Aguarde retorno pelo WhatsApp.", true);
      finalizarChat(); // Finaliza o chat diretamente, sem enviar para o WhatsApp
      break;

    case "finalizado":
      // Impede que o usuário continue mandando mensagens após o chat ser finalizado
      addMessage("Coordenação", "Este chat foi encerrado. Para iniciar um novo atendimento, por favor, atualize a página.", true);
      break;
  }
});

iniciarChat();