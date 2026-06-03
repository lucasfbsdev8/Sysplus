function confirmarPedido() {

    const formaPagamento = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    if (!formaPagamento) {
        alert('Selecione uma forma de pagamento.');
        return;
    }

    if (formaPagamento.value === 'cartao') {

        const numero = document.getElementById('numero-cartao').value.trim();
        const validade = document.getElementById('validade-cartao').value.trim();
        const cvv = document.getElementById('cvv-cartao').value.trim();
        const nome = document.getElementById('nome-cartao').value.trim();

        if (!numero || !validade || !cvv || !nome) {
            alert('Preencha os dados do cartão.');
            return;
        }
    }

    localStorage.removeItem('carrinho');
    sessionStorage.removeItem('endereco');

    alert('Pedido confirmado com sucesso!');
    window.location.href = 'index.html';
}
