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
const searchbtn = document.getElementById("searchbtn");
const searchInput = document.getElementById("searchinput");
const catagoryCardContainer = document.getElementById("catagoryCardContainer");
const mainCardContainer = document.getElementById("mainCardContainer");
function searchRecipe() {
  const value = searchInput.value;
  loadCards();
}
function loadCards() {
  recipies.map((recipe) => {
    const card = document.createElement();
    const image = document.createElement();
    const title = document.createElement();
    const disc = document.createElement();
    const likebutton = document.createElement();
    mainCardContainer.appendChild(card, image, title, disc, likebutton);
  });
}
function loadCatogoryCards() {
  recipies.map((recipe) => {
    const card = document.createElement();
    const image = document.createElement();
    const title = document.createElement();
    const disc = document.createElement();
    catagoryCardContainer.appendChild(card, image, title, disc, likebutton);
  });
}
