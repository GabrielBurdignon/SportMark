function leDados () {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse (strDados);
    }
    else {
        objDados = { data: [
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
                    ]}
    } 

    return objDados;
}

function salvaDados (dados) {
    localStorage.setItem ('db', JSON.stringify (dados));
}

function incluirDado (){
    let form = document.getElementById('form-contato');
    if (!form.checkValidity()) {
    form.reportValidity();
    return;
    }

    // Ler os dados do localStorage
    let objDados = leDados();

    // Verificar se objDados.data está definido
  if (!objDados.data) {
    objDados.data = []; // Inicializar como um array vazio
  }

    // Incluir uma nova quadra
    let strNome = document.getElementById ('inputNome').value;
    let strTelefone = document.getElementById ('inputTelefone').value;
    let strCapacidade = document.getElementById ('inputCapacidade').value;
    let strCategoria = document.getElementById ('inputCategoria').value;
    let strValor = document.getElementById ('inputValor').value;
    let strLocal = document.getElementById ('inputLocal').value;

    let novoId = 1;
    if (objDados.data.length != 0)
        novoId = objDados.data[objDados.data.length - 1].id + 1;

    let novoDado = {
        id: novoId,
        nome: strNome,
        telefone: strTelefone,
        capacidade: strCapacidade,
        categoria: strCategoria,
        valor: strValor,
        local: strLocal
    };

    objDados.data.push (novoDado);

    // Salvar os dados no localStorage novamente
    salvaDados (objDados);
    displayMessage('Quadra cadastrada com sucesso!');
    limparForms();

    var tableQuadras = document.getElementById('table-quadras');
    while (tableQuadras.firstChild) {
        tableQuadras.removeChild(tableQuadras.firstChild);
    }

    imprimeDados();
}

function displayMessage (texto) {
var mensagemElemento = document.getElementById("msg");
  var alertaElemento = document.getElementById("alerta");

  mensagemElemento.innerHTML = "<p>" + texto + "</p>";
  alertaElemento.classList.remove("d-none");

    setTimeout(() => {
        alertaElemento.classList.add('d-none');
    }, 3000);
}

function imprimeDados () {
    let tela = document.getElementById('table-quadras');
    let strHtml = '';
    let objDados = leDados ();

    for (let i = 0; i< objDados.data.length; i++) {
        const quadra = objDados.data[i];

        strHtml += `<tr><td scope="row">${quadra.id}</td>
                        <td>${quadra.nome}</td>
                        <td>${quadra.telefone}</td>
                        <td>${quadra.capacidade}</td>
                        <td>${quadra.categoria}</td>
                        <td>${quadra.valor}</td>
                        <td>${quadra.local}</td>
                    </tr>`
    }

    tela.innerHTML = strHtml;
}

function limparForms () {
    document.getElementById("form-contato").reset();
}

function updateQuadra() {
    let objDados = leDados();
    var campoId = document.getElementById("inputId").value;
  
    if (campoId == "") {
      displayMessage('Selecione uma quadra');
      return;
    }
  
    let strNome = document.getElementById('inputNome').value;
    let strTelefone = document.getElementById('inputTelefone').value;
    let strCapacidade = document.getElementById('inputCapacidade').value;
    let strCategoria = document.getElementById('inputCategoria').value;
    let strValor = document.getElementById('inputValor').value;
    let strLocal = document.getElementById('inputLocal').value;
  
    let form = document.getElementById('form-contato');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    for (var i = 0; i < objDados.data.length; i++) {
      if (objDados.data[i].id == campoId) {
        objDados.data[i].nome = strNome;
        objDados.data[i].telefone = strTelefone;
        objDados.data[i].capacidade = strCapacidade;
        objDados.data[i].categoria = strCategoria;
        objDados.data[i].valor = strValor;
        objDados.data[i].local = strLocal;
        break;
      }
    }
  
    limparForms();
    displayMessage('Quadra alterada com sucesso!');
    salvaDados(objDados);
    imprimeDados();
  }
  

function deleteQuadra () {
    let objDados = leDados ();
    var campoId = document.getElementById("inputId").value;

    if (campoId == "") {
    displayMessage('Selecione uma quadra');
    return;
    }

    for (var i = 0; i < objDados.data.length; i++) {
        var quadra = objDados.data[i];

        if (quadra.id == campoId) {
            objDados.data.splice(i, 1);
            break;
        }
    }

    limparForms();
    displayMessage('Quadra deletada com sucesso!');
    salvaDados(objDados);
    imprimeDados();
}

function alteraForms(e) {
    var linhaQuadra = e.target.parentNode;
    var quadras = linhaQuadra.querySelectorAll("td");

    document.getElementById("inputId").value = quadras[0].innerText;
    document.getElementById("inputNome").value = quadras[1].innerText;
    document.getElementById("inputTelefone").value = quadras[2].innerText;
    document.getElementById("inputCapacidade").value = quadras[3].innerText;
    document.getElementById("inputCategoria").value = quadras[4].innerText;
    document.getElementById("inputValor").value = quadras[5].innerText;
    document.getElementById("inputLocal").value = quadras[6].innerText;
}

function SelecionaQuadra() {
    let fcat = document.getElementById('filtro_categoria').value;
    let fcap = document.getElementById('filtro_capacidade').value;

    let tela = document.getElementById('table-quadras');
    let strHtml = '';
    let objDados = leDados ();

    var tableQuadras = document.getElementById('table-quadras');
    while (tableQuadras.firstChild) {
        tableQuadras.removeChild(tableQuadras.firstChild);
    }

    for (let index = 0; index < objDados.data.length; index++) {
        const quadra = objDados.data[index];

        if (((quadra.categoria == fcat) || (fcat == '')) &&
        ((quadra.capacidade == fcap) || (fcap == ''))) {
            strHtml += `<tr><td scope="row">${quadra.id}</td>
                            <td>${quadra.nome}</td>
                            <td>${quadra.telefone}</td>
                            <td>${quadra.capacidade}</td>
                            <td>${quadra.categoria}</td>
                            <td>${quadra.valor}</td>
                            <td>${quadra.local}</td>
                        </tr>`
        }
    }
    
    tela.innerHTML = strHtml;
}

// Configura os botões
document.getElementById ('btnInsert').addEventListener ('click', incluirDado);
document.getElementById ('btnClear').addEventListener ('click', limparForms);
document.getElementById("btnUpdate").addEventListener("click", updateQuadra);
document.getElementById("btnDelete").addEventListener("click", deleteQuadra);
document.getElementById("grid-quadras").addEventListener("click", alteraForms);
