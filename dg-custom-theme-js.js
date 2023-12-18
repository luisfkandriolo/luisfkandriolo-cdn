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

    document.querySelectorAll(".keywords-tags li")?.forEach((item) => {
      let keyword = item.innerText
      let keywordSearch = keyword.replace(" ","+")

      let uri = "https://www.decoracoesgeek.com.br/buscar?q=" + keywordSearch

      item.innerHTML = `<a href="${uri}" style="text-decoration:none; color:inherit;">${keyword}</a>`
    })

    if ($(window).width() <= 660) {
      $(document).ready(function(){
        $('.spanNone.banner.tarja').slick();
      });

      document.querySelectorAll('.menu.superior .wrap .nivel-um > li > ul > li a i.icon-chevron-right').forEach(item => {
        item.classList.remove('icon-chevron-right')
        item.classList.add('icon-chevron-down')
        item.addEventListener('click', event => {
          event.preventDefault()
          item.closest('li').querySelector('ul').classList.toggle('active')
        })
      })
    }

    setInterval(() => {
      if (!document.querySelector(".slick-next.slick-arrow")) return
      document.querySelector(".slick-next.slick-arrow")?.click()
    }, 2000)

    
    
  }, 300);
});
