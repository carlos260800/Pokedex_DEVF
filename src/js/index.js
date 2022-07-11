const fetchPokemon = () => {
  const pokeName = document.getElementById("pokeName");
  let pokeInput = pokeName.value.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
  fetch(url)
    .then((res) => {
       console.log(res);
      if (res.status != "200") {
        console.log(res);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data);
      // console.log(data.sprites.other.home.front_default);
      let pokeImg = data.sprites.other.home.front_default;
      let name=data.name;
      pokeImage(pokeImg);
      document.getElementById("name").innerHTML=name;
    });
  // console.log('siu')
};

// fetchPokemon();

const pokeImage = (url) => {
  const pokeImg = document.getElementById("pokeImg");
  pokeImg.src = url;
  // console.log("ola");
};
