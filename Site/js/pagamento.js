function confirmarPedido() {
    // 1. Captura qual forma de pagamento foi selecionada
    const formaPagamento = document.querySelector('input[name="pagamento"]:checked').value;

    // 2. Se for Cartão de Crédito, valida os campos do cartão
    if (formaPagamento === 'cartao') {
        const numero = document.getElementById('numero-cartao').value.trim();
        const validade = document.getElementById('validade-cartao').value.trim();
        const cvv = document.getElementById('cvv-cartao').value.trim();
        const nomeCartao = document.getElementById('nome-cartao').value.trim();

        if (!numero || !validade || !cvv || !nomeCartao) {
            alert('Por favor, preencha todos os dados do cartão de crédito.');
            return; // Para a execução aqui e não deixa finalizar
        }
    }

    // 3. Processamento do Sucesso (Aqui NÃO pede e-mail de visitante)
    alert('Pedido confirmado com sucesso! Obrigado por comprar na Sysplus.');
    
    // 4. Limpa o carrinho após a compra ser finalizada
    localStorage.removeItem('carrinho'); // Ou o nome da chave que você usa no seu carrinho.js

    // 5. Redireciona o usuário para uma página de sucesso ou para o início
    window.location.href = 'index.html';
}
