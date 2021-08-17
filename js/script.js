const listaCurrency = document.getElementById("lista-moedas");

// Função para manipular a informaçao da lista com as moedas e valores
const appendCurrency = (rates) => {
    const li = document.createElement("li");

    li.innerText = `${rates[0]} : ${rates[1].toFixed(2)}`;
    listaCurrency.appendChild(li);
};

// Função para manipular o texto do titulo da lista com as moedas
const updateBase = (base) => {
    const baseTitle = document.getElementById("base");
    baseTitle.innerHTML = `Valores referentes a 1 ${base.toUpperCase()}:`;
    // Com o toUpperCase a sigla da Moeda no titulo da lista de Moedas x Valores
    // sempre vai aparecer em maiusculo (caixa alta)
};

// Fazendo chamada a API e pegando a resposta via THEN com a possibilidade de colocar
// um CATCH em cada Promisse e assim pegar os erros, caso aconteçam, em cada Promisse!
const fetchCurrency = (currency) => {
    fetch(`https://api.exchangerate.host/latest?base=${currency}`)
        .then((response) =>
            response.json()
                .then((object) => {
                    const arrayRates = Object.entries(object.rates);
                    arrayRates.forEach((elemento) => appendCurrency(elemento));
                })
                .catch((reject) => console.log(reject, 'Erro ao tentar fazer a conversão para JSON!'))
            // catch para pegar o erro da promise 'response.json()' caso a conversão para o JSON falhe!
        )
        .catch((reject) => console.log(reject, 'Erro ao tentar acessar a API!!'));
    // catch para pegar o erro da promise 'fetch(`https://apii.exchangerate.host/latest?base=${currency}`)' 
    // caso ocorra algum problema de acesso a API!
};

// Fazendo chamada a API e pegando a resposta via async e await colocando um TRY CATCH unico
// para pegar os erros, caso aconteçam, em alguma das operações da fuunção quie estão dentro
// do bloco TRY!
const fetchCurrencyAsync = async (currency) => {
    // Inclusão do TRY CATCH para pegar algum erro nas operações que estão dentro das chaves do TRY  
    try {
        const responseRaw = await fetch(
            `https://api.exchangerate.host/latest?base=${currency}`
        );
        const responseJson = await responseRaw.json();
        // Quando o usário digita uma moeda inexistente a API retorna sempre como base
        // o EUR, dessa forma conseguimos pegar exatamente qual é a moeda digitada e em
        // caso de erro pegamos a resposta EUR para atualizar o tituilo da lista de moedas x valores    
        updateBase(responseJson.base);

        const arrayRates = Object.entries(responseJson.rates);

        arrayRates.forEach((elemento) => appendCurrency(elemento));
    } catch (error) {
        console.log(error);
    }
};

// Função principal que faz a chamada inicial a todo o processo de execuçao
// após o click do botao
const setupEventHandlers = () => {
    const searchButton = document.getElementById("btn-get-moeda");
    searchButton.addEventListener("click", () => {
        const currencyValue = document.getElementById("get-moeda").value;
        listaCurrency.innerHTML = "";
        fetchCurrencyAsync(currencyValue);
        // fetchCurrency(currencyValue);
    });
};

// Carregar o eventListener do botao após o carregamento da página
window.onload = () => {
    setupEventHandlers();
};