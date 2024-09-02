//Importa o módulo readline do Node.js
const readline = require('readline');

// Cria uma interface de leitura para ler entradas do usuário e enviar saídas 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function gerarAsteriscos(n) {
    // Cria um array de strings, onde a i-ésima string tem i asteriscos
    const resultado = [];
    for (let i = 1; i <= n; i++) {
        resultado.push('*'.repeat(i));
    }
    return resultado;
}

// Solicita a entrada do usuário
rl.question('Digite o número de linhas desejado: ', (input) => {
    const n = Number(input);

    // Verifica se a entrada é válida
    if (isNaN(n) || n <= 0 || !Number.isInteger(n)) {
        console.log('Por favor, insira um número inteiro maior que zero.');
    } else {
        // Gera e exibe o resultado
        const resultado = gerarAsteriscos(n);
        console.log(resultado);
    }

    // Fecha a interface de leitura
    rl.close();
});
