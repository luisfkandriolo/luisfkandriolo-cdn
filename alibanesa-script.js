(function () {
  window.lfka = {};

  function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
  }

  function bytesToBase64(bytes) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
  }

  function changeDetailsFunc() {
    try {
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
    } catch (error) {
      console.error("[lfka error]" + error);
      clearInterval(changeDetails);
    }
  }

  function changeLocalizationHash() {
    try {
      let target = document.querySelector("#btnConfirmarLocalizacao");

      if (!target || window.lfka.eventListenerLocalization) return;

      window.lfka.eventListenerLocalization = true;
      target.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        let lat = document
          .querySelector("#Lat")
          .getAttribute("value")
          .replace(",", ".");
        let lng = document
          .querySelector("#Lng")
          .getAttribute("value")
          .replace(",", ".");
        let address = document.querySelector("#Address").getAttribute("value");

        let key = "AIzaSyAGNvpDQ4gs57bQ1-UKErIoG6IsURXqCzE";

        let endpoint = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;

        let addressDecoded = JSON.parse(
          new TextDecoder().decode(base64ToBytes(address))
        );

        fetch(endpoint)
          .then(function (response) {
            return response.json();
          })
          .then(function (json) {
            let number = json.results[0].address_components[0].long_name;
            let street = json.results[0].address_components[1].long_name;
            let district = json.results[0].address_components[2].long_name;
            let city = json.results[0].address_components[3].long_name;
            let cep = json.results[0].address_components[6].long_name.replace(
              "-",
              ""
            );

            addressDecoded.Numero = number;
            addressDecoded.Logradouro = street;
            addressDecoded.Bairro = district;
            addressDecoded.Cidade = city;
            addressDecoded.Cep = cep;
            addressDecoded.Lat = lat;
            addressDecoded.Lng = lng;

            let newAddressHash = bytesToBase64(
              new TextEncoder().encode(JSON.stringify(addressDecoded))
            );

            document
              .querySelector("#Address")
              .setAttribute("value", newAddressHash);

            e.target.closest("form").submit();
          });
      });
    } catch (error) {
      console.error("[lfka error]" + error);
      clearInterval(changeDetails);
    }
  }

  // change aditional details
  const changeDetails = setInterval(() => {
    try {
      changeDetailsFunc();
      changeLocalizationHash();
    } catch (error) {
      console.error("[lfka error]" + error);
      clearInterval(changeDetails);
    }
  }, 300);
})();
