// ===== BANCO DE POÇÕES =====
let pocoes = [];
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const grid = document.getElementById("product-grid");
const modal = document.getElementById("modal");
const cart = document.getElementById("cart");

function gerarNumeroPedido() {
  return "PED" + Date.now();
}

// ===== CARREGAR CSV =====
async function carregarCSV() {
  try {
    const response = await fetch("pocoes.csv");
    const data = await response.text();

    const linhas = data.replace(/\r/g, "").trim().split("\n");
    linhas.shift(); // remove cabeçalho

    pocoes = linhas.map(linha => {
      const partes = linha.split(";");

      if (partes.length < 7) {
        console.error("Linha inválida no CSV:", linha);
        return null;
      }

      return {
        id: Number(partes[0].trim()),
        nome: partes[1].trim(),
        categoria: partes[2].trim(),
        descCurta: partes[3].trim(),
        descCompleta: partes[4].trim(),
        preco: Number(partes[5].trim()),
        raridade: partes[6].trim()
      };
    }).filter(p => p !== null);

    console.log("Poções carregadas:", pocoes);

    renderizarPocoes(pocoes);

  } catch (erro) {
    console.error("Erro ao carregar CSV:", erro);
  }
}

// ===== RENDERIZAR =====
function renderizarPocoes(lista) {
  grid.innerHTML = "";

  lista.forEach(pocao => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${pocao.nome}</h3>
      <p>${pocao.descCurta}</p>
      <p><strong>Raridade:</strong> ${pocao.raridade}</p>
      <p><strong>Preço:</strong> R$ ${pocao.preco}</p>
      <button onclick="abrirModal(${pocao.id})">Ver Detalhes</button>
    `;

    grid.appendChild(card);
  });
}

// ===== FILTRO (AGORA FUNCIONA) =====
function filtrarCategoria(categoria) {
  if (categoria === "Todas") {
    renderizarPocoes(pocoes);
  } else {
    const filtradas = pocoes.filter(p => p.categoria === categoria);
    renderizarPocoes(filtradas);
  }
}

// ===== MODAL =====
function abrirModal(id) {
  const pocao = pocoes.find(p => p.id === Number(id));

  if (!pocao) return;

  document.getElementById("modal-nome").innerText = pocao.nome;
  document.getElementById("modal-categoria").innerText = "Categoria: " + pocao.categoria;
  document.getElementById("modal-desc").innerText = pocao.descCompleta;
  document.getElementById("modal-preco").innerText = "Preço: R$ " + pocao.preco;

  document.getElementById("modal-add").onclick = () => adicionarCarrinho(pocao);

  modal.style.display = "flex";
}

function fecharModal() {
  modal.style.display = "none";
}

// ===== CARRINHO =====
function toggleCart() {
  cart.classList.toggle("active");
}



function adicionarCarrinho(pocao) {
  carrinho.push(pocao);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarCarrinho();
}

function atualizarCarrinho() {

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  if (!cartItems || !cartTotal || !cartCount) return;

  cartItems.innerHTML = "";
  let total = 0;

  carrinho.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.nome}</span>
      <span>R$ ${item.preco}</span>
    `;
    cartItems.appendChild(div);
    total += item.preco;
  });

  cartTotal.innerText = total.toFixed(2);
  cartCount.innerText = carrinho.length;
}

atualizarCarrinho();

// ===== SCROLL =====
function scrollToProdutos() {
  document.getElementById("produtos").scrollIntoView({
    behavior: "smooth"
  });
}

function finalizarWhatsApp() {

  if (carrinho.length === 0) {
    alert("Seu caldeirão está vazio!");
    return;
  }

  const numeroPedido = gerarNumeroPedido();

  let mensagem = `🧪 Pedido ${numeroPedido}\n`;
  mensagem += "Poções da Lua Negra\n\n";

  let total = 0;

  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - R$ ${item.preco}\n`;
    total += item.preco;
  });

  mensagem += `\n💰 Total: R$ ${total.toFixed(2)}`;

  const numero = "5599999999999"; // COLOQUE SEU NÚMERO AQUI
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, "_blank");
}

// ===== INICIAR =====
carregarCSV();