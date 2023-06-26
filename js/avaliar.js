const stars = document.querySelectorAll('.rating input');

stars.forEach(star => {
  star.addEventListener('click', function() {
    const rating = this.value;
    console.log('Avaliação: ' + rating);
  });
});
document.addEventListener("DOMContentLoaded", function() {
  var button = document.querySelector("button");
  button.addEventListener("click", function() {
    var nome = document.getElementById("nome");
    var opn = document.getElementById("opn");
    var rating = document.querySelector("input[name='rating']:checked");
    var errorMsg = document.getElementById("error-msg");
    var successMsg = document.getElementById("success-msg");
    
    // Remove as classes de erro dos campos anteriores
    nome.classList.remove("error");
    opn.classList.remove("error");
    
    var hasError = false;

    if (nome.value.trim() === "") {
      nome.classList.add("error");
      hasError = true;
    }
    
    if (opn.value.trim() === "") {
      opn.classList.add("error");
      hasError = true;
    }
    
    if (!rating) {
      errorMsg.textContent = "Por favor, preencha todos os campos obrigatórios.";
      hasError = true;
    }
    
    if (hasError) {
      return;
    }

    rating = rating.value;
    
    var depoimento = {
      nome: nome.value,
      opn: opn.value,
      rating: rating
    };
    
    // Obtém os dados existentes do Local Storage (se houver)
    var depoimentos = JSON.parse(localStorage.getItem("depoimentos")) || [];
    
    // Adiciona o novo depoimento aos dados existentes
    depoimentos.push(depoimento);
    
    // Salva os dados atualizados no Local Storage
    localStorage.setItem("depoimentos", JSON.stringify(depoimentos));
    
    console.log("Nome: " + nome.value);
    console.log("Opinião: " + opn.value);
    console.log("Classificação: " + rating);
    
    // Limpa a mensagem de erro se não houver mais erros
    errorMsg.textContent = "";
    
    // Exibe a mensagem de sucesso
    successMsg.textContent = "Depoimento salvo com sucesso!";
  });
});
