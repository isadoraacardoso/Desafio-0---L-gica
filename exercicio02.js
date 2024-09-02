const readline = require('readline');

// Cria uma interface de leitura para obter entradas do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Parâmetros booleanos definidos no código
const allowDuplicates = false; // Define se duplicatas são permitidas
const sortedPairs = true;    // Define se os pares devem ser ordenados
const uniquePairs = true;     // Define se apenas pares únicos devem ser retornados

// Função para encontrar os pares com a menor diferença absoluta
function paresComMenorDiferenca(array, allowDuplicates, sortedPairs, uniquePairs) {
    // Ordena o array para facilitar a comparação
    array = array.slice().sort((a, b) => a - b);
    
    // Remove duplicatas se não for permitido duplicados
    if (!allowDuplicates) {
        array = [...new Set(array)];
    }
    
    let minDiff = Infinity;
    let pairs = [];
    
    // Encontrar a menor diferença
    for (let i = 0; i < array.length - 1; i++) {
        const diff = array[i + 1] - array[i];
        if (diff < minDiff) {
            minDiff = diff;
            pairs = [[array[i], array[i + 1]]];
        } else if (diff === minDiff) {
            pairs.push([array[i], array[i + 1]]);
        }
    }
    
    // Remove pares duplicados se necessário
    if (uniquePairs) {
        const uniquePairsSet = new Set();
        pairs.forEach(pair => {
            const sortedPair = pair.slice().sort((a, b) => a - b);
            uniquePairsSet.add(JSON.stringify(sortedPair));
        });
        pairs = Array.from(uniquePairsSet).map(pair => JSON.parse(pair));
    }
    
    // Ordena os pares se solicitado
    if (sortedPairs) {
        pairs.sort((a, b) => {
            if (a[0] === b[0]) {
                return a[1] - b[1];
            }
            return a[0] - b[0];
        });
    }
    
    return pairs;
}

// Função para ler a entrada do usuário e processar
function lerEntrada() {
    rl.question('Digite o array de números inteiros separados por vírgula: ', (inputArray) => {
        // Converte a entrada do usuário em um array de números
        const array = inputArray.split(',').map(num => parseInt(num.trim(), 10));
        
        // Verifica se todos os valores são números válidos
        if (array.some(isNaN)) {
            console.log('Por favor, insira apenas números inteiros separados por vírgula.');
            rl.close();
            return;
        }

        // Obtém os pares com a menor diferença
        const resultado = paresComMenorDiferenca(array, allowDuplicates, sortedPairs, uniquePairs);
        console.log('Pares com a menor diferença:', resultado);
        
        // Fecha a interface de leitura
        rl.close();
    });
}

// Chama a função para iniciar a leitura
lerEntrada();
