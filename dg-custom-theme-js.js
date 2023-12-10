$(document).ready(function () {
  setTimeout(() => {

    $(window).scroll(function (event) {
      var scroll = $(window).scrollTop();
      if (scroll > 0) {
        $(".header-cupom").hide()
        $("#cabecalho").css("margin-top","0")
      } else {
        $(".header-cupom").show();
        $("#cabecalho").css("margin-top","30px")
      }
    });

    $("li.action-item.support > div > ul > li:nth-child(1)").remove()
    $("div.span4.links-rodape.links-rodape-atendimento > ul > li:nth-child(1)").remove()

    setInterval(() => {
      if (!document.querySelector("body.pagina-produto")) return
      
      document.querySelectorAll(".keywords-tags li")?.forEach((item) => {
        let keyword = item.innerText
        let keywordSearch = keyword.replace(" ","+")
  
        let uri = "https://www.decoracoesgeek.com.br/buscar?q=" + keywordSearch
  
        item.innerHTML = `<a href="${uri}" style="text-decoration:none; color:inherit;">${keyword}</a>`
      })
    }, 300)
  }, 300);
});
