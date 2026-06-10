function getCarrinho() {
  return JSON.parse(localStorage.getItem('carrinho')) || [];
}

function salvarCarrinho(c) {
  localStorage.setItem('carrinho', JSON.stringify(c));
}

function adicionarCarrinho(id, qtd = 1) {
  const produto = PRODUTOS.find(p => p.id === id);
  if (!produto) return;

  let carrinho = getCarrinho();
  const idx = carrinho.findIndex(i => i.id === id);

  if (idx >= 0) {
    carrinho[idx].qtd += qtd;
  } else {
    carrinho.push({ ...produto, qtd });
  }

  salvarCarrinho(carrinho);
  atualizarBadge();   // atualiza o contador no header (implementado a seguir)
  mostrarToast('Produto adicionado ao carrinho!', 'sucesso');
}

function atualizarBadge() {
  const carrinho = getCarrinho();
  const total = carrinho.reduce((soma, item) => soma + item.qtd, 0);
  const badge = document.getElementById('badge-carrinho');
  if (!badge) return;
  badge.textContent = total;
  badge.style.display = total > 0 ? 'inline-block' : 'none';
}

function mostrarToast(msg, tipo = '') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.className = 'toast visivel ' + tipo;
    setTimeout(() => { toast.className = 'toast'; }, 2500);
}

atualizarBadge();
