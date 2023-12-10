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

    $("li.action-item.support > div > ul > li:nth-child(1)").remove()
    
  }, 300);
});
