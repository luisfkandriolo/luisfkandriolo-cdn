$(document).ready(function () {
  setTimeout(() => {
    $("li.tel-phone").remove();

    $("#cabecalho > .barra-inicial").after(
      '<div class="barra-superior-secundaria"><span class="primeira-compra">Use o código QA6UEGSXU e ganhe 5% de desconto na sua primeira compra!</span></div>'
    );

    window.addEventListener("scroll", (event) => {
      let scroll = this.scrollY;
      scroll > 0
        ? $(".barra-superior-secundaria").hide()
        : $(".barra-superior-secundaria").show();
    });
  }, 300);
});
