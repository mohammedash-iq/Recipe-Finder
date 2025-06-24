let recipies = [
  {
    name: "recipe1",
    description: "dicreiption of the rcipt;loremipsum",
    image: "recipe.png",
  },
  {
    name: "recipe1",
    description: "dicreiption of the rcipt;loremipsum",
    image: "recipe.png",
  },
  {
    name: "recipe1",
    description: "dicreiption of the rcipt;loremipsum",
    image: "recipe.png",
  },
  {
    name: "recipe1",
    description: "dicreiption of the rcipt;loremipsum",
    image: "recipe.png",
  },
  {
    name: "recipe1",
    description: "dicreiption of the rcipt;loremipsum",
    image: "recipe.png",
  },
];
let catogory = [
  {
    name: "catogory1",
    disc: "catogory discption",
    image: "catogory.png",
  },
  {
    name: "catogory1",
    disc: "catogory discption",
    image: "catogory.png",
  },
  {
    name: "catogory1",
    disc: "catogory discption",
    image: "catogory.png",
  },
  {
    name: "catogory1",
    disc: "catogory discption",
    image: "catogory.png",
  },
  {
    name: "catogory1",
    disc: "catogory discption",
    image: "catogory.png",
  },
];
const searchInput = document.getElementById("searchinput");
const catagoryCardContainer = document.getElementById("catagoryCardContainer");
const mainCardContainer = document.getElementById("mainCardContainer");
loadCatogoryCards();
function searchRecipe() {
  var data = searchData();
  if (!searchInput.value || searchInput.value.trim() == "") {
    console.log("type anything");
    searchInput.value = "";
    searchInput.focus();
  } else {
    searchData(searchInput.value, "s");
    loadCards();
  }
}
function loadCards() {
  recipies.map((recipe) => {
    const card = document.createElement("div");
    const image = document.createElement("img");
    image.setAttribute("src", recipe.image);
    const title = document.createElement("h4");
    title.innerText = recipe.name;
    const disc = document.createElement("p");
    disc.innerText = recipe.description;
    const likebutton = document.createElement("button");
    likebutton.innerText = "❤";
    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(disc);
    card.appendChild(likebutton);
    mainCardContainer.appendChild(card);
    mainCardContainer.style.display = "flex";
  });
}
function loadCatogoryCards() {
  catogory.map((recipe) => {
    const card = document.createElement("div");
    const image = document.createElement("img");
    image.setAttribute("src", recipe.image);
    const title = document.createElement("h5");
    title.innerText = recipe.name;
    const disc = document.createElement("p");
    disc.innerText = recipe.disc;
    card.appendChild(title);
    card.appendChild(image);
    card.append(disc);
    catagoryCardContainer.appendChild(card);
    catagoryCardContainer.style.display = "flex";
  });
}
async function searchData(data, type) {
  console.log("fetching api for the required data/////");
  let response, result;
  try {
    switch (type) {
      case "s": {
        response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
        );
        if (response.ok) {
          result = await response.json();
          console.log(result);
        } else {
          throw new Error("Error Fetching the data", response.status);
        }
      }
      case "c": {
        response = await fetch(url + data);
      }
    }
  } catch (error) {
    console.error("Error occured:" + error);
  }
}
