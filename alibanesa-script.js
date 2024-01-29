(function () {
  // change aditional details
  const changeDetails = setInterval(() => {
    try {
      let target = document.querySelector("#etapa1detalhes");
      if (!target) return;

      if (!target.querySelector("#collapseAditionals")) {
        let aditionalText = target?.querySelector("#headingTwo .panel-title");

        if (!aditionalText.innerHTML.trim.includes("Adicionais")) return;

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
    } catch (error) {
      console.error("[lfka error]" + error);
      clearInterval(changeDetails);
    }
  }, 500);
})();
