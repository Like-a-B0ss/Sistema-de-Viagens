function porcentagem() {
    // Número aleatório entre 1 e 100 (inclusive)
    var porcent = Math.floor(Math.random() * 100) + 1;

    document.getElementById("porcentagem").textContent = porcent.toFixed(2) + "%";


}

// Função para gerar pontos turísticos aleatórios
function exibirPontosTuristicos() {

    // Número aleatório entre 5 e 10 (inclusive)
    var numeroPontos = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

    // Aleatorizar pontos turísticos
    var pontosTuristicos = [
        "Montanha Dourada",
        "Praia das Conchas",
        "Cachoeira da Serenidade",
        "Floresta Esmeralda",
        "Vale das Borboletas",
        "Lagoa da Tranquilidade",
        "Pico da Aurora",
        "Grutas do Silêncio",
        "Planalto Encantado",
        "Mirante do Crepúsculo",
        "Parque das Águas",
        "Cidade das Orquideas",
        "Parque das Aves",
    ];

    var pontosAleatorios = [];
    for (var i = 0; i < numeroPontos; i++) {
        var indiceAleatorio = Math.floor(Math.random() * pontosTuristicos.length);
        pontosAleatorios.push(pontosTuristicos[indiceAleatorio]);
    }

    return pontosAleatorios;
}

// Função para calcular tempo de viagem
function calcularTempo(multi, distancia) {
    return (multi * distancia * 2) / 100 / 24;
}

// Função para calcular a distância
function calcularDistancia(transporte) {

    let distancia = Math.floor(Math.random() * 4394) + 1; // Gera um número entre 1 e 4394(distancia maxima de uma ponta a outra Brasil)

    let multi;

    switch (transporte) {
        case '1':
            multi = 10;
            break;
        case '2':
            multi = 2;
            break;
        case '3':
            multi = 20;
            break;
        case '4':
            multi = 12;
            break;
        case '5':
            multi = 100;
            break;
        default:
            multi = 1; // Adicionei um valor padrao para que se nao for selecionando nada tenha um valor pre definido
    }

    return { distancia, multi };
}

function calcular() {
    let transporte = document.getElementById("transporte").value;
    let estado = document.getElementById("estado").value;
    let cidade = document.getElementById("cidade").value;



    if (estado == "ERRO") {
        // Exibe uma mensagem de erro se o estado não for selecionado
        document.getElementById("distancia").textContent = "Por Favor, Escolha o Estado";
        document.getElementById("porcentagem").textContent = "Por Favor, Escolha o Estado";
        document.getElementById("pontos_turisticos").textContent = "Por Favor, Escolha o Estado";
        document.getElementById("dias_viagem").textContent = "Por Favor, Escolha o Estado";
    } else {

        
        //funcao porcentagem
        porcentagem();

        // Calcular distância e multiplicador
        let { distancia, multi } = calcularDistancia(transporte);

        // Calcular tempo total
        let tempo_total = calcularTempo(multi, distancia);

        // Exibir resultados na página
        document.getElementById("distancia").textContent = distancia.toFixed(2) + " Quilômetro";
        document.getElementById("pontos_turisticos").textContent = exibirPontosTuristicos().join(', ');
        document.getElementById("dias_viagem").textContent = tempo_total.toFixed(2) + " Dias";

        // Criar um objeto JSON com os dados e armazenar no LocalStorage
        let json = { 'transporte': transporte, 'estado': estado, 'cidade': cidade };
        localStorage.setItem('Dados', JSON.stringify(json));
    }
}

// Funções LocalStorage
function deleteAllData() {
    // Limpa todos os dados armazenados no LocalStorage
    localStorage.clear();
    document.getElementById("Exibir").innerHTML = "Todos os dados foram apagados.";
}

function saveDataToLocalStorage() {
    // Recupera os dados do LocalStorage
    let storedData = localStorage.getItem('Dados');

    // Converte os dados de string JSON para objeto
    let jsonData = JSON.parse(storedData);

    // Exibe os dados na tela
    document.getElementById("Exibir").innerHTML = JSON.stringify(jsonData);
}

function deleteSpecificData() {
    // Obtém a chave fornecida pelo usuário
    const keyName = document.getElementById("keyName").value;

    if (keyName) {
        // Remove o item do LocalStorage com a chave fornecida
        localStorage.removeItem(keyName);
        document.getElementById("Exibir").innerHTML = "Dado '" + keyName + "' foi apagado.";
    } else {
        // Exibe uma mensagem de erro se nenhuma chave for fornecida
        document.getElementById("Exibir").innerHTML = "Informe uma Chave Válida.";
    }
}
