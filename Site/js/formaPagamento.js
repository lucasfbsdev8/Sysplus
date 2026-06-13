function pagar() {
    const selecionado = document.querySelector('input[name="pagamento"]:checked');
 
    if (!selecionado) {
        alert('Selecione uma forma de pagamento.');
        return;
    }
 
    sessionStorage.setItem('forma_pagamento', selecionado.value);
    window.location.href = 'pagamento.html';
}
