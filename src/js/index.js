// Peticion a la API
const fetchPoke = () => {
  fetch(API_URL + "?limit=1154")
    .then((data) => data.json())
    .then((response) => pokeLista(response));
};

// Clase
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

// Ejecuta peticion para la lista
fetchPoke();
