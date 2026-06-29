// js do site: menu do celular, tema claro/escuro e o formulario de contato

document.addEventListener("DOMContentLoaded", function () {
  // menu hamburguer
  const btnMenu = document.getElementById("btnMenu");
  const listaMenu = document.getElementById("listaMenu");

  btnMenu.addEventListener("click", function () {
    const aberto = listaMenu.classList.toggle("aberto");
    btnMenu.setAttribute("aria-expanded", aberto);
  });

  // fecha o menu quando clica num link
  listaMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      listaMenu.classList.remove("aberto");
      btnMenu.setAttribute("aria-expanded", "false");
    });
  });

  // tema
  const btnTema = document.getElementById("btnTema");
  const html = document.documentElement;

  // o botao mostra pra qual tema vai
  if (localStorage.getItem("tema") === "claro") {
    html.classList.add("tema-claro");
    btnTema.textContent = "escuro";
  } else {
    btnTema.textContent = "claro";
  }

  btnTema.addEventListener("click", function () {
    const claro = html.classList.toggle("tema-claro");
    btnTema.textContent = claro ? "escuro" : "claro";
    localStorage.setItem("tema", claro ? "claro" : "escuro");
  });

  // formulario: valida e finge que envia
  const form = document.getElementById("formContato");
  const modal = document.getElementById("modal");
  const fecharModal = document.getElementById("fecharModal");

  // regex pro email
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // poe a mensagem de erro e marca o campo
  function definirErro(campo, idErro, mensagem) {
    document.getElementById(idErro).textContent = mensagem;
    campo.classList.toggle("invalido", mensagem !== "");
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault(); // simulacao

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const mensagem = document.getElementById("mensagem");
    let valido = true;

    // nome: pelo menos 3 letras
    if (nome.value.trim().length < 3) {
      definirErro(nome, "erroNome", "Informe seu nome (mínimo 3 caracteres).");
      valido = false;
    } else {
      definirErro(nome, "erroNome", "");
    }

    // email: nao pode estar vazio e tem que bater no regex
    if (email.value.trim() === "") {
      definirErro(email, "erroEmail", "Informe seu e-mail.");
      valido = false;
    } else if (!regexEmail.test(email.value.trim())) {
      definirErro(email, "erroEmail", "E-mail inválido (ex.: nome@dominio.com).");
      valido = false;
    } else {
      definirErro(email, "erroEmail", "");
    }

    // mensagem: minimo de 10 caracteres
    if (mensagem.value.trim().length < 10) {
      definirErro(mensagem, "erroMensagem", "Escreva uma mensagem (mínimo 10 caracteres).");
      valido = false;
    } else {
      definirErro(mensagem, "erroMensagem", "");
    }

    // se passou em tudo, limpa o form e abre o modal
    if (valido) {
      form.reset();
      modal.classList.add("aberto");
      modal.setAttribute("aria-hidden", "false");
    }
  });

  // fecha o modal no botao ou clicando fora da caixinha
  fecharModal.addEventListener("click", fechar);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) fechar();
  });
  function fechar() {
    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");
  }
});
