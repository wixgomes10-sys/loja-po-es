const chat = document.getElementById("chat");
const input = document.getElementById("inputMensagem");

function enviarMensagem(){

    const texto = input.value.trim();

    if(texto === "") return;

    adicionarMensagem(texto, "usuario");

    input.value = "";

    setTimeout(()=>{
        respostaAutomatica(texto);
    }, 800);
}

function adicionarMensagem(texto, tipo){

    const msg = document.createElement("div");

    msg.classList.add("msg");
    msg.classList.add(tipo);

    msg.innerText = texto;

    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;
}

function respostaAutomatica(texto){

    texto = texto.toLowerCase();

    let resposta = "Não entendi... deseja uma poção?";

    if(texto.includes("oi") || texto.includes("olá")){
        resposta = "Olá viajante...";
    }

    else if(texto.includes("poção")){
        resposta = "Tenho poções de vida, mana e invisibilidade.";
    }

    else if(texto.includes("vida")){
        resposta = "Poção de vida custa 50 moedas.";
    }

    else if(texto.includes("mana")){
        resposta = "Poção de mana custa 35 moedas.";
    }

    else if(texto.includes("comprar")){
        resposta = "Compra confirmada! 🧪";
    }

    else if(texto.includes("tchau")){
        resposta = "Volte sempre...";
    }

    adicionarMensagem("🧙‍♀️ " + resposta, "bruxa");
}