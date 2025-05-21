let operador = '';
let numero1 = '';
let numero2 = '';
let resultado = '';
let historico = [];

const display = document.getElementById('display');
const botoesBasicos = document.getElementById('botoes-basicos');
const botoesCientificos = document.getElementById('cientifica-botoes');
const toggleCalculadora = document.getElementById('toggle-calculadora');
const historicoList = document.getElementById('historico');

// Atualiza a tela de exibição com toda a conta
const atualizarDisplay = (texto) => {
    display.textContent = texto;
};

// Limpa a tela
const limparDisplay = () => {
    atualizarDisplay('0');
    numero1 = '';
    numero2 = '';
    operador = '';
};

// Alterna entre a calculadora básica e científica
toggleCalculadora.addEventListener('click', () => {
    const calculadoraAtiva = botoesBasicos.style.display !== 'none';
    
    if (calculadoraAtiva) {
        botoesBasicos.style.display = 'none';
        botoesCientificos.style.display = 'grid';
        toggleCalculadora.textContent = 'Básica';
    } else {
        botoesBasicos.style.display = 'grid';
        botoesCientificos.style.display = 'none';
        toggleCalculadora.textContent = 'Científica';
    }
});

// Lógica dos botões da calculadora básica
document.querySelectorAll('.botoes button').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.value;
        
        if ('0123456789'.includes(value)) {
            if (operador === '') {
                numero1 += value;
                atualizarDisplay(numero1);
            } else {
                numero2 += value;
                atualizarDisplay(numero1 + ' ' + operador + ' ' + numero2);
            }
        }

        if (['+', '-', '*', '/'].includes(value)) {
            if (numero1 !== '' && numero2 !== '') {
                calcular();
            }
            operador = value;
            atualizarDisplay(numero1 + ' ' + operador);
        }

        if (value === '=') {
            if (numero1 && numero2 && operador) {
                calcular();
                atualizarDisplay(resultado);
                adicionarHistorico(`${numero1} ${operador} ${numero2} = ${resultado}`);
                numero1 = resultado.toString();
                numero2 = '';
                operador = '';
            }
        }

        if (value === 'C') {
            limparDisplay();
        }
    });
});

// Função de cálculo
const calcular = () => {
    switch (operador) {
        case '+':
            resultado = parseFloat(numero1) + parseFloat(numero2);
            break;
        case '-':
            resultado = parseFloat(numero1) - parseFloat(numero2);
            break;
        case '*':
            resultado = parseFloat(numero1) * parseFloat(numero2);
            break;
        case '/':
            resultado = parseFloat(numero1) / parseFloat(numero2);
            break;
    }
};

// Lógica dos botões da calculadora científica
document.querySelectorAll('.cientifica button').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.value;
        const num1 = parseFloat(numero1);

        if (value === 'sin') {
            resultado = Math.sin(num1);
        } else if (value === 'cos') {
            resultado = Math.cos(num1);
        } else if (value === 'tan') {
            resultado = Math.tan(num1);
        } else if (value === 'log') {
            resultado = Math.log10(num1);
        } else if (value === 'ln') {
            resultado = Math.log(num1);
        } else if (value === '^2') {
            resultado = Math.pow(num1, 2);
        } else if (value === '√') {
            resultado = Math.sqrt(num1);
        }

        if (resultado !== undefined) {
            adicionarHistorico(`${value}(${numero1}) = ${resultado}`);
            atualizarDisplay(resultado);
            numero1 = resultado.toString();
            numero2 = '';
            operador = '';
        }
    });
});

// Adicionar operação ao histórico
const adicionarHistorico = (operacao) => {
    historico.push(operacao);
    atualizarHistorico();
};

// Atualizar a lista de histórico na interface
const atualizarHistorico = () => {
    historicoList.innerHTML = '';
    historico.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historicoList.appendChild(li);
    });
};

// Função para mostrar o histórico
const toggleHistorico = document.getElementById('toggle-historico');
toggleHistorico.addEventListener('click', () => {
    const historicoContainer = document.getElementById('historico-container');
    const calculadora = document.querySelector('.calculadora');
    historicoContainer.style.display = 'block';
    calculadora.style.display = 'none';
});

// Limpar histórico
const limparHistoricoBtn = document.getElementById('limpar-historico');
limparHistoricoBtn.addEventListener('click', () => {
    historico = [];
    atualizarHistorico();
});

// Voltar para a calculadora
function voltarCalculadora() {
    document.getElementById('historico-container').style.display = 'none';
    document.querySelector('.calculadora').style.display = 'block';
}
