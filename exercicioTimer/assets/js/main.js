const relogio = document.querySelector('.relogio'); //pegando o paragrafo html do relogio.
const iniciar = document.querySelector('.iniciar'); //pegando os botões.
const parar = document.querySelector('.parar');
const zerar = document.querySelector('.zerar');
let segundos = 0;
let timer;
let condicao = false;

//pegando o evento de clicar no botão.
iniciar.addEventListener('click', function(event) {
    iniciaRelogio();
});

parar.addEventListener('click', function(event) {
    paraRelogio();
});

zerar.addEventListener('click', function(event) {
    zeraRelogio();
});

//pegando a hora zerada.
function exibeHora (segundos) {
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString('pt-BR', {
        hour12: false, //removendo o PM/AM da hora.
        timeZone: 'GMT' //aqui ele está considerando 01/01/1970 que é a hora zero. Também pode ser UTC invés de GMT
    });
}

function iniciaRelogio (){
    relogio.style.color = '#000000';//alterando o atributo de cor com CSS injetado por javascript assim que clicamos nos botões.
    if(condicao != true){//verifica se a função já foi executada, impedindo que o calculo dos segundos seja chamado sequencialmente, bugando a hora.
        condicao = true;
        timer = setInterval (function() { //a função set interval recebe uma função, para não criarmos uma nova, utilizamos uma função anonima que printa na tela a funçã exibeHora dentro de um determinado período de tempo. Executa sem fim.
            segundos++;
            relogio.innerHTML = exibeHora(segundos);
        }, 1000);
    }
}

function zeraRelogio(){
    relogio.style.color = '#ff0000';//alterando o atributo de cor com CSS injetado por javascript assim que clicamos nos botões.
    segundos = 0;
    relogio.innerHTML = exibeHora(segundos);
    setTimeout (function() { //a variável timer recebe uma função anonima que chama a função iniciaRelogio a cada 1 segundo.
        clearInterval(timer); //Limpamos o internavo definido na função inciaRelogio, impedindo que seja executada.
    }, 0); //tempo sempre é passado em milisegundos
    condicao = false;//ao zerar o relógio, mudamos a condição para falso para que os segundos possam ser calculados novamente.
}


function paraRelogio(){
    relogio.style.color = '#ff0000';//alterando o atributo de cor com CSS injetado por javascript assim que clicamos nos botões.
    setTimeout (function() {
        clearInterval(timer); //limpamos o intervalo definido na função iniciaRelogio dentro dentro de 0 milisegundo após pressionar o botão.
    }, 0);
    condicao = false;//ao parar o relógio, mudamos a condição para falso para que os segundos possam ser calculados novamente.
}

/*
solução do bug do timmer do professor:

function iniciaRelogio (){
    relogio.style.color = '#000000';//alterando o atributo de cor com CSS injetado por javascript assim que clicamos nos botões.
    clearInterval(timer); //Simplesmente limpa qualquer intervalo antes de executar um novo.
    timer = setInterval (function() { //a função set interval recebe uma função, para não criarmos uma nova, utilizamos uma função anonima que printa na tela a funçã exibeHora dentro de um determinado período de tempo. Executa sem fim.
        segundos++;
        relogio.innerHTML = exibeHora(segundos);
    }, 1000);
}


*/