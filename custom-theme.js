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

    $(".hidden-phone.rastreio-rapido > a > span").html('Melhor Rastreio')
    $(".hidden-phone.rastreio-rapido > a").attr('href','https://melhorrastreio.com.br/')
    $(".hidden-phone.rastreio-rapido > a").attr('target','blank')

    setInterval(() => {
      document.querySelectorAll(".adc-fav.hidden-phone")?.forEach((item) => {
        if (item) item.remove()
      })
    }, 500)
  }, 300);
});
