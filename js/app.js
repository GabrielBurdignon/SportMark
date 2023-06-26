const DadosMock = { quadras: [
                        { id: 1, 
                        nome: "Ousadia Sort Center",
                        telefone: "(31) 99824-6123",
                        capacidade: "15",
                        categoria: "Society",
                        valor: "250.00",
                        local: "Av. Amintas, 304 - Santos, BH",
                        descricao: "Quadra muito bem Localizada"
                        },
                        { id: 2,
                        nome: "Beicin Sport Club",
                        telefone: "(11) 99756-5561",
                        capacidade: "10",
                        categoria: "Salão",
                        valor: "150.00",
                        local: "Rua Raja, 52 - Bandeirantes, SP"
                        },
                        { id: 3,
                        nome: "Andryws Football Place",
                        telefone: "(21) 99827-5143",
                        capacidade: "20",
                        categoria: "Campo",
                        valor: "350.00",
                        local: "Rua Bernadete, 201 - Barra, RJ"
                        }
                    ],
                    reservas: [ 
                        {id: 1, nome: "João Pedro", codigo: "JP2023BH"}, 
                        {id: 2, nome: "Maria Luiza", codigo: "ML2023SP"}, 
                        {id: 3, nome: "Pedro Gomes", codigo: "PG2023RJ"} 
                    ],
                    depoimentos: [
                        {id: 1, nome: "João Pedro", quadra: "Ousadia Sport Center", opniao: "", rating: 4}, 
                        {id: 2, nome: "Maria Luiza", quadra: "Beicin Sport Club", opniao: "", rating: 5}, 
                        {id: 3, nome: "Pedro Gomes", quadra: "Andryws Football Place", opniao: "", rating: 3} 
                    ],
                    data: [
                        {
                        id: 1,
                        nome: "Ousadia Sort Center",
                        telefone: "(31) 99824-6123",
                        capacidade: "15",
                        categoria: "Society",
                        valor: "250.00",
                        local: "Av. Amintas, 304 - Santos, BH",
                        descricao: "Quadra muito bem Localizada"
                        },
                        {
                        id: 2,
                        nome: "Beicin Sport Club",
                        telefone: "(11) 99756-5561",
                        capacidade: "10",
                        categoria: "Salão",
                        valor: "150.00",
                        local: "Rua Raja, 52 - Bandeirantes, SP"
                        },
                        {
                        id: 3,
                        nome: "Andryws Football Place",
                        telefone: "(21) 99827-5143",
                        capacidade: "20",
                        categoria: "Campo",
                        valor: "350.00",
                        local: "Rua Bernadete, 201 - Barra, RJ"
                        }
                    ],
                    contas: [
                        {id: 1, nome: "João Pedro", senha: "JP2023BH"}, 
                        {id: 2, nome: "Maria Luiza", senha: "ML2023SP"}, 
                        {id: 3, nome: "Pedro Gomes", senha: "PG2023RJ"} 
                    ],
                    lugar: [
                        { id: 1, quadra: 'Ousadia Sport Center', local: 'Belo Horizonte', descricao: 'Quadra de exelente qualidade com uma boa iluminação para os usuários', imagem: 'quadra1.jpg', estrelas: 'estrelas.png' },
                        { id: 2, quadra: 'Beicin Sport Club', local: 'São Paulo', descricao: 'Quadra de exelente qualidade com uma boa iluminação para os usuários', imagem: 'quadra3.jpg', estrelas: 'estrelas.png' },
                        { id: 3, quadra: 'Andryws Football Place', local: 'Rio de Janeiro', descricao: 'Quadra de exelente qualidade com uma boa iluminação para os usuários', imagem: 'quadra1.jpg', estrelas: 'estrelas.png' },
                    ],
                    agenda: [
                        { id: 1, data: '' },
                        { id: 2, data: '' },
                        { id: 3, data: '' }
                    ],
                    tempo: [
                        { id: 1, hora: '' },
                        { id: 2, hora: '' },
                        { id: 3, hora: '' }
                    ],
                    login: [
                        {
                            testeLogin: false,
                            nameLogin: ""
                        }
                    ]
                };

let FILTRO_QUADRA = 0

//************************** Funções **************************/

/* Funções manipulação LocalStorage */
function InicializaDados () {
    localStorage.setItem ('db', JSON.stringify (objDados));


}
                    
function getDados () {
    let strDados = localStorage.getItem('db');
    return JSON.parse (strDados);
}

function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}

function imprimeMensagem (texto) {
    var mensagemElemento = document.getElementById("msg");
    var alertaElemento = document.getElementById("alerta");

    mensagemElemento.innerHTML = "<p>" + texto + "</p>";
    alertaElemento.classList.remove("d-none");

    setTimeout(() => {
        alertaElemento.classList.add('d-none');
    }, 3000);
}


/* Funções Pesquisa */
function imprimePesquisa() {
    let str = ''
    objDados = getDados();

    for (let i = 0; i < objDados.lugar.length; i++) {
        let buscar = objDados.lugar[i]
        if (!FILTRO_QUADRA || buscar.local == FILTRO_QUADRA)
        str += `<div class="cards-quadras">
        <div class="card mb-3" style="max-width: 950px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${buscar.imagem}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${buscar.quadra}</h5>
                        <p class="card-text">${buscar.local}</p>
                        <p class="card-text"><small class="text-muted">${buscar.descricao}</small></p>
                        <img src="${buscar.estrelas}" class="img-flu">
                        <br>
                        <br>
                        <button class="preco">Valor: R$100</button>
                    </div>
                </div>

            </div>
        </div>
    </div>`
    }
    document.querySelector('#tela').innerHTML = str
}


/* Funções Minhas reservas */ 
function verificaReserva () {
    objDados = getDados();

    const nomeInput = document.getElementById("nome");
    const nome = nomeInput.value.trim();
    const codigoInput = document.getElementById("codigo");
    const codigo = codigoInput.value.trim();

    for(let i = 0; i< objDados.reservas.length; i++) {
        if(objDados.reservas[i].nome == nome && objDados.reservas[i].codigo == codigo) {
            window.location.href = "vereserva.html?id=" + (i);
            return;
        } 
    }
    
    imprimeMensagem('Nome ou código inválido');
}


/* Funções Promoções */
function exibePromocoes () {
    let strHtml = '';
    let objDados = getDados ();

    for (let i = 0; i< objDados.promocoes.length; i++) {
        strHtml += `<div class="col-md-5 m-3">
        <div class="card shadow border-white">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="img/qdr1.jpg" class="card-img-top img-fluid h-100" alt="Minha Imagem">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Crad Title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural
                            lead-in to
                            additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }

    document.querySelector('#cards-promocoes').innerHTML = str
}

/* Funções Avaliações */
function htmlEstrelas(qntEstrelas) {
    let html = ``

    for(let i = 0; i < qntEstrelas; i++){
        html += `<div></div>`
    }

    return html
}

/* Funções Entrar */
function validaLogin() {
    const nomeInput = document.getElementById("username");
    const nome = nomeInput.value.trim();
    const senhaInput = document.getElementById("password");
    const senha = senhaInput.value.trim();

    let objDados = getDados ();

    for(let i=0; i< objDados.contas.length; i++) {
        let usuario = objDados.contas[i];

        if(usuario.nome == nome && usuario.senha == senha) {
            objDados.login[0].testeLogin = true;
            objDados.login[0].nameLogin = usuario.nome;
            salvaDados(objDados);
            window.location.href = "index.html";
            return;
        }

        if(nome == "Funcionario" && senha == "1234") {
            window.location.href = "cadastroquadras.html";
            return;
        }
    }

    imprimeMensagem('Nome ou senha inválida');
}

function imprimeLogin() {
    let objDados = getDados ();

    const liElement = document.querySelector('#nameEntrar')

    if(objDados.login[0].testeLogin) {
        liElement.innerHTML = ` <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    ${objDados.login[0].nameLogin}
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <span class="dropdown-item" onclick="sairLogin()">Sair</span>
                            </li>`
    } else {
        liElement.innerHTML = `<a class="nav-link" href="login.html">Entrar</a>`
    }
}

function gerarCodigo() {
    let objDados = JSON.parse(localStorage.getItem('db'));
    
    if(objDados.login[0].testeLogin) {
        var codigo = Math.floor(Math.random() * 1000000);
        var mensagemDiv = document.getElementById('mensagem');
        mensagemDiv.innerHTML = 'Seu código é: ' + codigo;
        mensagemDiv.style.display = 'block';

        let novoId = 1;
        if (objDados.reservas.length != 0)
            novoId = objDados.reservas[objDados.reservas.length - 1].id + 1;

        let novaReserva = {
            id: novoId,
            nome: objDados.login[0].nameLogin,
            codigo: codigo
        };

        objDados.reservas.push (novaReserva);
        localStorage.setItem ('db', JSON.stringify (objDados)); 

        console.log(objDados.reservas);

        return;
    }

    var mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.innerHTML = 'Faça login para reservar uma quadra';
    mensagemDiv.style.display = 'block';
  }

function sairLogin() {
    let objDados = getDados ();
    objDados.login[0].testeLogin = false;
    objDados.login[0].nameLogin = "";
    salvaDados(objDados);
    window.location.href = "index.html";
}

/* DOM loaded */
document.addEventListener('DOMContentLoaded', () => {

    if(!getDados()) {
        localStorage.setItem ('db', JSON.stringify (DadosMock));
    } 

    let filtrarQuadra = document.querySelector('#alugarBuscar')
    filtrarQuadra.addEventListener('change', () => {
        FILTRO_QUADRA = filtrarQuadra.value
    
        let url = FILTRO_QUADRA ? "buscar.html?id="+FILTRO_QUADRA : "buscar.html"
        $("#linkBuscar").attr("href", url)
    })

    document.getElementById('btnEntrar').addEventListener('click', validaLogin);
    document.getElementById('btnEntrar').addEventListener('click', validaLogin);

    imprimePesquisa();
    imprimeLogin();
});

window.addEventListener('load', () => {
    imprimeLogin();
  });