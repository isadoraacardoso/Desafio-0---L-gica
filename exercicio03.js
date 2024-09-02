const readline = require('readline');

// Cria uma interface de leitura para obter entradas do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Parâmetros booleanos fixos
const distinctOnly = true;  // Se true, garante que os subconjuntos não contenham elementos duplicados
const sortSubsets = true;   // Se true, ordena os subconjuntos e seus elementos

// Função para gerar todos os subconjuntos com parâmetros opcionais
function gerarSubconjuntos(array, maxSize, minSize, distinctOnly, sortSubsets) {
    // Remove elementos duplicados se necessário
    if (distinctOnly) {
        array = [...new Set(array)];
    }
    
    const subconjuntos = [];
    const total = 1 << array.length; 
    
    for (let i = 0; i < total; i++) {
        const subconjunto = [];
        for (let j = 0; j < array.length; j++) {
            if (i & (1 << j)) {
                subconjunto.push(array[j]);
            }
        }
        // Adiciona o subconjunto se estiver dentro do intervalo de tamanhos
        if (subconjunto.length <= maxSize && subconjunto.length >= minSize) {
            subconjuntos.push(subconjunto);
        }
    }
    
    // Ordena os subconjuntos e seus elementos se solicitado
    if (sortSubsets) {
        subconjuntos.forEach(sub => sub.sort((a, b) => a - b));
        subconjuntos.sort((a, b) => {
            if (a.length === b.length) {
                for (let k = 0; k < a.length; k++) {
                    if (a[k] !== b[k]) return a[k] - b[k];
                }
            }
            return a.length - b.length;
        });
    }
    
    return subconjuntos;
}

// Função para ler a entrada do usuário e processar
function lerEntrada() {
    rl.question('Digite o conjunto de números inteiros separados por vírgula: ', (inputArray) => {
        // Converte a entrada do usuário em um array de números
        const array = inputArray.split(',').map(num => parseInt(num.trim(), 10));
        
        // Verifica se todos os valores são números válidos
        if (array.some(isNaN)) {
            console.log('Por favor, insira apenas números inteiros separados por vírgula.');
            rl.close();
            return;
        }

        rl.question('Digite o tamanho máximo dos subconjuntos (ou deixe em branco para não limitar): ', (maxSizeInput) => {
            const maxSize = maxSizeInput ? parseInt(maxSizeInput, 10) : Infinity;
            
            rl.question('Digite o tamanho mínimo dos subconjuntos: ', (minSizeInput) => {
                const minSize = parseInt(minSizeInput, 10);
                
                // Verifica se minSize é um número positivo
                if (isNaN(minSize) || minSize < 0) {
                    console.log('Por favor, insira um valor válido para o tamanho mínimo dos subconjuntos.');
                    rl.close();
                    return;
                }
                
                // Obtém os subconjuntos com os parâmetros fornecidos
                const resultado = gerarSubconjuntos(array, maxSize, minSize, distinctOnly, sortSubsets);
                console.log('Subconjuntos:', resultado);
                
                // Fecha a interface de leitura
                rl.close();
            });
        });
    });
}

// Chama a função para iniciar a leitura
lerEntrada();
