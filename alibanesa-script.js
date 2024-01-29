(function () {
  function changeDetailsFunc() {
    let target = document.querySelector("#etapa1detalhes");
    if (!target) return;

    if (!target.querySelector("#collapseAditionals")) {
      let aditionalText = target?.querySelector("#headingTwo .panel-title");

      if (!aditionalText?.innerHTML.trim().includes("Adicionais")) return;

      target.classList.add("isAditionals");

      target
        ?.querySelector("#headingTwo")
        ?.insertAdjacentHTML(
          "beforeend",
          '<button id="collapseAditionals"><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 18 18"><path fill="#494c4e" d="M17.707 5.707l-8 8a1 1 0 0 1-1.414 0l-8-8A1 1 0 0 1 1 4h16a1 1 0 0 1 .924.617A.97.97 0 0 1 18 5a1 1 0 0 1-.293.707z"/></svg></button>'
        );

      target
        ?.querySelector("#collapseAditionals")
        ?.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          e.target.closest("#collapseAditionals").classList.toggle("active");
          e.target
            .closest("#etapa1detalhes")
            .querySelector(".panel-body")
            .classList.toggle("active");
        });
    }
  }

  function jumpLocalizationScreen() {
    let target = document.querySelector("#btnConfirmarLocalizacao");
    if (!target) return;
    target.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      debugger;

      let lat = document
        .querySelector("#Lat")
        .getAttribute("value")
        .replace(",", ".");
      let lng = document
        .querySelector("#Lng")
        .getAttribute("value")
        .replace(",", ".");

      let key = "AIzaSyAGNvpDQ4gs57bQ1-UKErIoG6IsURXqCzE";

      let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;

      fetch(endpoint)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          console.log(json);
        });
    });
  }

  // change aditional details
  const changeDetails = setInterval(() => {
    try {
      changeDetailsFunc();
      jumpLocalizationScreen();
    } catch (error) {
      console.error("[lfka error]" + error);
      clearInterval(changeDetails);
    }
  }, 300);
})();
