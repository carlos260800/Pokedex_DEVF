// Busqueda
const busquedaLista = document.querySelector("#busqueda");

busquedaLista.addEventListener("keyup", (e) => {
  resBusqueda = pokemonLista.filter((pokemon) =>
    pokemon.name.includes(e.target.value.toLowerCase())
  );
  document.getElementById("pokeLista").innerHTML = resBusqueda
    .map((pokemon) => agregarPokeLista(pokemon))
    .join("");
});

// Boton buscar
const pokeStatsBoton = () => {
  const pokeName = document.getElementById("busqueda");
  let pokeInput = pokeName.value.toLowerCase();
  const url = `${API_URL}` + "/" + `${pokeInput}`;
  fetch(url)
    .then((res) => {
      pokeImage("../../assets/error.jpeg");
      document.getElementById("name").innerHTML = "error";
      if (res.status != "200") {
      } else {
        return res.json();
      }
    })
    .then((data) => {
      let id = data.id;
      let pokeImg = data.sprites.other.home.front_default;
      let name = data.name;
      let hp = data.stats[0].base_stat;
      let ataque = data.stats[1].base_stat;
      let defensa = data.stats[2].base_stat;
      let ataqueEspecial = data.stats[3].base_stat;
      let defensaEspecial = data.stats[4].base_stat;
      let velocidad = data.stats[5].base_stat;
      pokeImage(pokeImg);
      document.getElementById("id").innerHTML = "<p><b>ID:</b> " + id + "</p>";
      document.getElementById("name").innerHTML = name.toUpperCase();
      document.getElementById("hp").innerHTML = "<p><b>HP:</b>  " + hp + "</p>";
      document.getElementById("ataque").innerHTML =
        "<p><b>Ataque:</b>  " + ataque + "</p>";
      document.getElementById("defensa").innerHTML =
        "<p> <b>Defensa:</b>  " + defensa + "</p>";
      document.getElementById("ataqueEspecial").innerHTML =
        "<p> <b>Ataque Especial:</b>  " + ataqueEspecial + "</p>";
      document.getElementById("defensaEspecial").innerHTML =
        "<p><b>Defensa Especial:</b> " + defensaEspecial + "</p>";
      document.getElementById("velocidad").innerHTML =
        "<p><b>Velocidad:</b> " + velocidad + "</p>";
    });
};

// Mostrar imagen de la busqueda
const pokeImage = (url) => {
  const pokeImg = document.getElementById("pokeImg");
  pokeImg.src = url;
};
/////////////////////////////
