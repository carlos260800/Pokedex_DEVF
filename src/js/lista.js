var contenidoLista;
let pokemonLista;

// Lista de Pokemones
const pokeLista = (data) => {
  pokemonLista = data.results.map((pokemon) => {
    return {
      id: pokemon.url.split("/")[6],
      name: pokemon.name,
      image: `${IMAGE_URL}/${pokemon.url.split("/")[6]}.png`,
    };
  });

  document.getElementById("pokeLista").innerHTML = pokemonLista
    .map((pokemon) => agregarPokeLista(pokemon))
    .join("");

  contenidoLista = document.getElementById("pokeLista");
  return pokemonLista;
};

// Lista de pokemones
const agregarPokeLista = (pokemon) => {
  const { id, name, image } = pokemon;
  return (
    '<div class="centrarTarjeta tarjeta  text-white  bg-card "onclick="pokeData(' +
    id +
    ')">' +
    "<p>ID: " +
    id +
    '<img src="' +
    image +
    '" alt="pokemon" style="width: 75px;">' +
    "</p>" +
    "<div>" +
    "<p>" +
    name.toUpperCase() +
    "</p>" +
    "</div>" +
    "</div>"
  );
};

const pokeData = (id) => {
  fetch(API_URL + "/" + id)
    .then((data) => data.json())
    .then((response) => pokeStats(response, id));
};

const pokeStats = (data, id) => {
  pokemon = new Pokemon(`${IMAGE_URL}/` + id + ".png", data.forms[0].name, [
    data.stats[0].base_stat,
    data.stats[1].base_stat,
    data.stats[2].base_stat,
    data.stats[3].base_stat,
    data.stats[4].base_stat,
    data.stats[5].base_stat,
  ]);
  document.getElementById("pokeImg").src = pokemon.image;
  document.getElementById("id").innerHTML = "<p><b>ID:</b>  " + id + "</p>";
  document.getElementById("name").innerHTML = pokemon.name.toUpperCase();
  document.getElementById("hp").innerHTML =
    "<p><b>HP:</b>  " + data.stats[0].base_stat + "</p>";
  document.getElementById("ataque").innerHTML =
    "<p> <b>Ataque:</b>  " + data.stats[1].base_stat + "</p>";
  document.getElementById("defensa").innerHTML =
    "<p> <b>Defensa:</b> " + data.stats[2].base_stat + "</p>";
  document.getElementById("ataqueEspecial").innerHTML =
    "<p> <b>Ataque Especial:</b> " + data.stats[3].base_stat + "</p>";
  document.getElementById("defensaEspecial").innerHTML =
    "<p><b>Defensa Especial:</b> " + data.stats[4].base_stat + "</p>";
  document.getElementById("velocidad").innerHTML =
    "<p><b>Velocidad:</b> " + data.stats[5].base_stat + "</p>";
};

// Mobile
