function mostrarToast(msg, tipo = '') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast visivel ' + tipo;
    setTimeout(() => { t.className = 'toast'; }, 2500);
}

function finalizarPedido() {
    localStorage.removeItem('carrinho');
    sessionStorage.removeItem('endereco');
    sessionStorage.removeItem('forma_pagamento');
    mostrarToast('Pedido confirmado! Obrigado pela compra.', 'sucesso');
    setTimeout(() => window.location.href = 'index.html', 2000);
}

function renderPix() {
    const codigo = '00020126580014BR.GOV.BCB.PIX0136sysplus@banco.com.br5204000053039865802BR5913SYSPLUS LOJA6009SAO PAULO62070503***6304ABCD';
    return `
        <div class="pix-titulo">
            <h2>Como pagar usando PIX</h2>
        </div>
        <p><strong>1.</strong> Copie o código PIX de pagamento abaixo</p>
        <div class="pix-codigo">
            <span id="pix-code">${codigo.substring(0, 60)}...</span>
            <button onclick="copiarPix()">Copiar</button>
        </div>
        <ul class="pix-instrucoes">
            <li>Abra o aplicativo do seu banco ou instituição financeira e encontre a opção de pagamento Pix</li>
            <li>Escolha a opção 'Pix copia e cola' e cole o código do Pix</li>
            <li>Verifique cuidadosamente os detalhes da transação e confirme a compra em seu aplicativo bancário</li>
            <li>Seu pagamento será processado em poucos segundos</li>
        </ul>
        <div class="pix-qr">
            <p>Ou escaneie o QR code usando um aplicativo bancário compatível com Pix:</p>
            <div class="qr-placeholder" id="qr-placeholder"></div>
        </div>
        <div class="end" style="margin-top:30px">
            <button class="btn-editar" onclick="finalizarPedido()">CONFIRMAR PAGAMENTO</button>
        </div>`;
}
 
function renderBoleto() {
    return `
        <div class="boleto-titulo">
            <h2>BOLETO</h2>
            <span style="margin-left:8px;font-size:18px;font-weight:bold;">COLOQUE O CPF DO PAGADOR</span>
        </div>
        <div class="campo-info">
            <label>Digite o CPF do pagador</label>
            <input type="tel" id="cpf-boleto" placeholder="___.___.___-__" maxlength="14">
        </div>
        <div class="end" style="margin-top:16px">
            <button class="btn-editar" onclick="confirmarBoleto()">CONFIRMAR DADOS</button>
        </div>
        <div class="boleto-gerar" id="btn-gerar-boleto" style="display:none" onclick="gerarBoleto()">
            <span class="download-icon">⬇</span>
            GERAR BOLETO
        </div>`;
}
 
function renderCartao(tipo) {
    const titulo   = tipo === 'cartao-credito' ? 'CRÉDITO' : 'DÉBITO';
    const btnLabel = tipo === 'cartao-credito' ? 'PRÓXIMO' : 'CONFIRMAR COMPRA';
    const btnAcao  = tipo === 'cartao-credito' ? 'irParaParcelas()' : 'confirmarDebito()';
 
    let html = `<h4>${titulo}</h4>`;
 
    if (tipo === 'cartao-credito') html += `<div id="etapa-dados" class="ativa">`;
 
    html += `
        <p><strong>1. Adicione informações do seu cartão</strong></p>
        <div class="campo-info">
            <input type="tel" id="numero-cartao" placeholder="Número do cartão" maxlength="19">
        </div>
        <div class="campo-info">
            <input type="text" id="nome-cartao" placeholder="Nome do titular">
        </div>
        <div class="campo-info">
            <input type="tel" id="validade-cartao" placeholder="MM/AA" maxlength="5">
        </div>
        <div class="campo-info">
            <input type="tel" id="cvv-cartao" placeholder="Código de segurança (CVV)" maxlength="4">
        </div>
        <div class="end" style="margin-top:20px">
            <button class="btn-editar" onclick="${btnAcao}">${btnLabel}</button>
        </div>`;
 
    if (tipo === 'cartao-credito') {
        html += `</div>
        <div id="etapa-parcelas">
            <p><strong>2. Escolha um plano de pagamento</strong></p>
            <div id="lista-parcelas"></div>
            <div class="end" style="margin-top:20px">
                <button class="btn-editar" onclick="finalizarPedido()">CONFIRMAR COMPRA</button>
            </div>
        </div>`;
    }
 
    return html;
}

function confirmarBoleto() {
    const cpf = document.getElementById('cpf-boleto').value.trim();
    if (cpf.length < 14) {
        mostrarToast('Insira um CPF válido.', 'erro');
        return;
    }
    document.getElementById('btn-gerar-boleto').style.display = 'block';
    mostrarToast('Dados confirmados!', 'sucesso');
}
 
function gerarBoleto() {
    mostrarToast('Boleto gerado! Verifique seu e-mail.', 'sucesso');
    setTimeout(() => finalizarPedido(), 2000);
}

function validarDadosCartao() {
    const numero   = document.getElementById('numero-cartao').value.trim();
    const nome     = document.getElementById('nome-cartao').value.trim();
    const validade = document.getElementById('validade-cartao').value.trim();
    const cvv      = document.getElementById('cvv-cartao').value.trim();
    if (!numero || !nome || !validade || !cvv) {
        mostrarToast('Preencha todos os dados do cartão.', 'erro');
        return false;
    }
    return true;
}
 
function irParaParcelas() {
    if (!validarDadosCartao()) return;
 
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const total    = carrinho.reduce((s, i) => s + (parseFloat(i.preco) || 0) * i.qtd, 0);
    const juros    = total * 0.04;
 
    const planos = [
        { x: 2,  val: (total + juros) / 2  },
        { x: 4,  val: (total + juros) / 4  },
        { x: 10, val: (total + juros) / 10 },
        { x: 12, val: (total + juros) / 12 },
    ];
 
    document.getElementById('lista-parcelas').innerHTML = planos.map((p, idx) => `
        <label class="parcela-opcao">
            <input type="radio" name="parcela" value="${p.x}" ${idx === 0 ? 'checked' : ''}>
            <div class="parcela-info">
                <strong>R$ ${p.val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} X ${p.x} meses</strong>
                <small>Juros: R$ ${juros.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} | Total: R$ ${(total + juros).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</small>
            </div>
        </label>`).join('');
 
    document.getElementById('etapa-dados').classList.remove('ativa');
    document.getElementById('etapa-parcelas').classList.add('ativa');
}
 
/* ── Lógica Débito ── */
function confirmarDebito() {
    if (!validarDadosCartao()) return;
    finalizarPedido();
}
 
/* ── PIX copiar ── */
function copiarPix() {
    navigator.clipboard.writeText('00020126580014BR.GOV.BCB.PIX0136sysplus@banco.com.br5204000053039865802BR5913SYSPLUS LOJA6009SAO PAULO62070503***6304ABCD')
        .then(() => mostrarToast('Código copiado!', 'sucesso'))
        .catch(() => mostrarToast('Não foi possível copiar.', 'erro'));
}
 
/* ── Máscara de campos ── */
document.addEventListener('input', function (e) {
    if (e.target.id === 'numero-cartao') {
        e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19);
    }
    if (e.target.id === 'validade-cartao') {
        e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
    }
    if (e.target.id === 'cpf-boleto') {
        e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2').substring(0, 14);
    }
});

/* ── QR code real do Pix (gerado via QRCode.js) ── */
function gerarQrCodePix(codigo) {
    const container = document.getElementById('qr-placeholder');
    if (!container || typeof QRCode === 'undefined') return;

    container.innerHTML = '';
    new QRCode(container, {
        text: codigo,
        width: 150,
        height: 150,
        colorDark: '#222222',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
    });
}

const forma      = sessionStorage.getItem('forma_pagamento');
const container  = document.getElementById('conteudo-pagamento');
 
if (!forma) {
    container.innerHTML = '<p style="text-align:center;padding:40px">Forma de pagamento não encontrada. <a href="formapagamento.html">Voltar</a></p>';
} else if (forma === 'pix') {
    const codigoPix = '00020126580014BR.GOV.BCB.PIX0136sysplus@banco.com.br5204000053039865802BR5913SYSPLUS LOJA6009SAO PAULO62070503***6304ABCD';
    container.innerHTML = renderPix();
    gerarQrCodePix(codigoPix);
} else if (forma === 'boleto') {
    container.innerHTML = renderBoleto();
} else if (forma === 'cartao-debito') {
    container.innerHTML = renderCartao('cartao-debito');
} else if (forma === 'cartao-credito') {
    container.innerHTML = renderCartao('cartao-credito');
}