const limparHistoricoBtn = document.getElementById('limpar-historico');

// Limpa o histórico
limparHistoricoBtn.addEventListener('click', () => {
    historico = [];
    atualizarHistorico();
});

// Voltar para a calculadora
function voltarCalculadora() {
    document.getElementById('historico-container').style.display = 'none';
    document.querySelector('.calculadora').style.display = 'block';
}
