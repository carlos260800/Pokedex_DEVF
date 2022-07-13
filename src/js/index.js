const API_URL = "https://pokeapi.co/api/v2/pokemon";
const fetchPoke = () => {
  fetch(API_URL + "?limit=1154")
    .then((data) => data.json())
    .then((response) => pokeLista(response));
};

class Pokemon {
  constructor(image, name, types, weight, height, abilities, stats) {
    this.image = image;
    this.name = name;
    this.types = types;
    this.weight = weight;
    this.height = height;
    this.abilities = abilities;
    this.stats = stats;
  }
}

var contenidoLista;
let pokemonLista;

document.addEventListener("keyup", (e) => {
  if (e.target.matches("#busqueda")) {
    resBusqueda = pokemonLista.filter((pokemon) =>
      pokemon.name.includes(e.target.value.toLowerCase())
    );
    document.getElementById("pokeLista").innerHTML = resBusqueda
      .map((pokemon) => agregarPoke(pokemon))
      .join("");
  }
});

const pokeLista = (data) => {
  pokemonLista = data.results.map((pokemon) => {
    return {
      id: pokemon.url.split("/")[6],
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
        pokemon.url.split("/")[6]
      }.png`,
    };
  });

  document.getElementById("pokeLista").innerHTML = pokemonLista
    .map((pokemon) => agregarPoke(pokemon))
    .join("");

  contenidoLista = document.getElementById("pokeLista");
  return pokemonLista;
};

const agregarPoke = (pokemon) => {
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
  console.log(id);
  fetch(API_URL + "/" + id)
    .then((data) => data.json())
    .then((response) => pokeStats(response, id));
};

const pokeStats = (data, id) => {
  console.log(data);
  pokemon = new Pokemon(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/" +
      id +
      ".png",
    data.forms[0].name,
    data.weight,
    data.height,
    [
      data.stats[0].base_stat,
      data.stats[1].base_stat,
      data.stats[2].base_stat,
      data.stats[3].base_stat,
      data.stats[4].base_stat,
      data.stats[5].base_stat,
    ]
  );
  console.log(pokemon);
  document.getElementById("pokeImg").src = pokemon.image;
  document.getElementById("id").innerHTML = "<p>ID " + id + "</p>";
  document.getElementById("name").innerHTML = pokemon.name.toUpperCase();
  document.getElementById("hp").innerHTML =
    "<p>HP " + data.stats[0].base_stat + "</p>";
  document.getElementById("ataque").innerHTML =
    "<p> Ataque " + data.stats[1].base_stat + "</p>";
  document.getElementById("defensa").innerHTML =
    "<p> Defensa " + data.stats[2].base_stat + "</p>";
  document.getElementById("ataqueEspecial").innerHTML =
    "<p> Ataque Especial " + data.stats[3].base_stat + "</p>";
  document.getElementById("defensaEspecial").innerHTML =
    "<p>Defensa Especial " + data.stats[4].base_stat + "</p>";
  document.getElementById("velocidad").innerHTML =
    "<p>Velocidad " + data.stats[5].base_stat + "</p>";
};

const pokeStatsBoton = () => {
  const pokeName = document.getElementById("busqueda");
  let pokeInput = pokeName.value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
  fetch(url)
    .then((res) => {
      console.log(res);
      pokeImage("../../assets/error.jpeg");
      document.getElementById("name").innerHTML = "error";
      if (res.status != "200") {
        console.log(res);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
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
      document.getElementById("id").innerHTML = "<p>ID " + id + "</p>";
      document.getElementById("name").innerHTML = name.toUpperCase();
      document.getElementById("hp").innerHTML = "<p>HP " + hp + "</p>";
      document.getElementById("ataque").innerHTML =
        "<p>Ataque " + ataque + "</p>";
      document.getElementById("defensa").innerHTML =
        "<p> Defensa " + defensa + "</p>";
      document.getElementById("ataqueEspecial").innerHTML =
        "<p> Ataque Especial " + ataqueEspecial + "</p>";
      document.getElementById("defensaEspecial").innerHTML =
        "<p>Defensa Especial " + defensaEspecial + "</p>";
      document.getElementById("velocidad").innerHTML =
        "<p>Velocidad " + velocidad + "</p>";
    });
};

const pokeImage = (url) => {
  const pokeImg = document.getElementById("pokeImg");
  pokeImg.src = url;
};

fetchPoke();
