$(document).ready(function () {
  setTimeout(() => {
    
    window.addEventListener("scroll", (event) => {
      let scroll = this.scrollY;
      if (scroll > 0) {
        $(".header-cupom").hide()
        $("#cabecalho").css("margin-top","0")
      } else {
        $(".header-cupom").show();
        $("#cabecalho").css("margin-top","30px")
      }
    });

    $(".hidden-phone.rastreio-rapido > a > span").html('Melhor Rastreio')
    $(".rastreio-rapido, .rastreio-mb").off()
    $(".hidden-phone.rastreio-rapido > a").attr('href','https://melhorrastreio.com.br/')
    $(".hidden-phone.rastreio-rapido > a").attr('target','blank')
    
  }, 300);
});
