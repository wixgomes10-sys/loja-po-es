// Produtos
const produtos = [
  {
    id: 1,
    nome: "Poção de Cura",
    desc: "Restaura toda a saúde instantaneamente",
    preco: 45,
    img: "img/poção1.png"
  },
  {
    id: 2,
    nome: "Poção de Invisibilidade",
    desc: "Fica invisível por 30 minutos",
    preco: 65,
    img: "img/poção2.png"
  },
  {
    id: 3,
    nome: "Poção de Força",
    desc: "Força sobre-humana por 1 hora",
    preco: 55,
    img: "img/poção3.png"
  },
  {
    id: 4,
    nome: "Poção de Velocidade",
    desc: "Corra mais rápido que o vento",
    preco: 50,
    img: "img/poção1.png" // você pode trocar a imagem
  }
];

// Renderizar produtos
function renderProdutos() {
  const grid = document.getElementById('produtos-grid');
  grid.innerHTML = '';
  produtos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.nome}">
      <div class="produto-info">
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <div class="preco">${p.preco} moedas de ouro</div>
        <button class="btn-comprar" data-id="${p.id}">Adicionar ao Carrinho</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Eventos de compra
  document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const produto = produtos.find(p => p.id === id);
      adicionarAoCarrinho(produto);
    });
  });
}

// Carrinho
let carrinho = [];

function adicionarAoCarrinho(produto) {
  carrinho.push(produto);
  atualizarCarrinho();
  
  // Toast mágico
  const toast = document.createElement('div');
  toast.style.position = 'fixed';
  toast.style.bottom = '100px';
  toast.style.right = '30px';
  toast.style.background = '#6b00b3';
  toast.style.color = '#fff';
  toast.style.padding = '1rem 1.5rem';
  toast.style.borderRadius = '15px';
  toast.style.boxShadow = '0 0 30px #ffd700';
  toast.style.zIndex = '3000';
  toast.innerHTML = `✅ ${produto.nome} adicionada!`;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 2500);
}

function atualizarCarrinho() {
  document.getElementById('cart-count').textContent = carrinho.length;
}

// Modal Carrinho
const modal = document.getElementById('cart-modal');
const cartBtn = document.getElementById('cart-btn');
const closeModal = document.querySelector('.close-modal');

cartBtn.addEventListener('click', () => {
  mostrarCarrinho();
  modal.style.display = 'flex';
});

closeModal.addEventListener('click', () => modal.style.display = 'none');

function mostrarCarrinho() {
  const itemsDiv = document.getElementById('cart-items');
  itemsDiv.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;
    const div = document.createElement('div');
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.margin = '1rem 0';
    div.innerHTML = `
      <span>${item.nome}</span>
      <span>${item.preco} moedas</span>
    `;
    itemsDiv.appendChild(div);
  });

  document.getElementById('cart-total').textContent = total;
}

// Formulário contato
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  alert('✉️ Mensagem enviada para o Mago! Ele responderá em breve com uma poção especial.');
  e.target.reset();
});

// Menu mobile
const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// Personagem flutuante + falas mágicas
const mago = document.getElementById('floating-mago');
const bubble = document.getElementById('speech-bubble');
const bubbleText = document.getElementById('bubble-text');

const falas = [
  "Ei, aventureiro! Quer uma poção de sorte?",
  "Minhas poções são as mais poderosas do reino!",
  "Cuidado com a poção de invisibilidade... eu já me perdi uma vez 😂",
  "Compre 3 e ganhe uma poção de amor grátis (brincadeira)",
  "O que você precisa hoje? Cura, força ou velocidade?",
  "Shhh... não conte pra ninguém, mas eu uso as melhores ervas!"
];

mago.addEventListener('click', () => {
  const falaAleatoria = falas[Math.floor(Math.random() * falas.length)];
  bubbleText.textContent = falaAleatoria;
  bubble.classList.add('show');
  
  setTimeout(() => {
    bubble.classList.remove('show');
  }, 4500);
});

// Inicializar tudo
window.onload = () => {
  renderProdutos();
  atualizarCarrinho();
  
  // Checkout fake
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if (carrinho.length === 0) return alert("Seu carrinho está vazio!");
    alert("🎉 Parabéns! Você comprou poções mágicas! (Pagamento feito com feitiço)");
    carrinho = [];
    atualizarCarrinho();
    modal.style.display = 'none';
  });
};