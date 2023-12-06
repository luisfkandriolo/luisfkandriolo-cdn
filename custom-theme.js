$(document).ready(function () {
  setTimeout(() => {
    $("li.tel-phone").remove();

    $("#cabecalho > .barra-inicial").after(
      '<div class="barra-superior-secundaria"><span class="primeira-compra">Use o código <strong>QA6UEGSXU</strong> e ganhe 5% de desconto na sua primeira compra!</span></div>'
    );
  }, 300);
});
