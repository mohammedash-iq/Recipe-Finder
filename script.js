const searchInput = document.getElementById("searchinput");
const catagoryCardContainer = document.getElementById("catagoryCardContainer");
const mainCardContainer = document.getElementById("mainCardContainer");
const recipeContainer = document.getElementById("recipeContainer");
const favoriteCard = document.getElementById("favoriterecipe");
const noFavoriteWarning = document.getElementById("nofavoritewarning");
// displays the category section cards intially when the page loads
loadCatogoryCards();
// displays the favorite recipe section when page is loaded
loadFavoritesCards();
// displays a random recipe in the recipe details section
searchData("", "random");

function searchRecipe() {
  if (!searchInput.value || searchInput.value.trim() == "") {
    alert("Type a value!");
    searchInput.value = "";
    searchInput.focus();
  } else {
    const data = searchData(searchInput.value, "search");
  }
}
function loadCards(data) {
  mainCardContainer.innerHTML = "";
  if (!data.meals) {
    mainCardContainer.innerHTML =
      "<p class='text-red-500 text-xl'>No results found.</p>";
  } else {
    data.meals.map((meal) => {
      const card = document.createElement("div");
      card.setAttribute("id", meal.idMeal);
      card.setAttribute("onclick", "updateRecipeCard(event)");
      const image = document.createElement("img");
      image.setAttribute("alt", `${meal.strMeal} image`);
      image.setAttribute("src", meal.strMealThumb);
      image.className = "p-2 rounded-2xl h-[75%]";
      const title = document.createElement("h4");
      title.className =
        "text-center font-semibold text-emerald-400 p-1 h-[10%]";
      title.innerText = meal.strMeal;
      const likebutton = document.createElement("button");
      likebutton.id = meal.idMeal;
      likebutton.innerText = "💚";
      likebutton.className =
        "text-sm bg-emerald-300 p-1 mx-2 rounded-2xl h-[10%]";
      likebutton.setAttribute("onclick", "addFavorite(event)");
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(likebutton);
      card.className =
        "col-span-1 rounded-xl justify-center items-center  bg-emerald-100 max-sm:col-span-2 ";
      mainCardContainer.appendChild(card);
    });
  }
}
async function loadCatogoryCards() {
  const data = await getCategoryData();
  data.categories.map((category) => {
    const card = document.createElement("div");
    card.className =
      "bg-emerald-100 m-1 flex justify-center rounded-md max-sm:col-span-6 max-lg:col-span-4 lg:col-span-2";
    const image = document.createElement("img");
    image.setAttribute("alt", `${category.strCategory} image`);
    image.setAttribute("src", category.strCategoryThumb);
    image.className = "flex-1/4 w-0.5 p-2 rounded-full ";
    const title = document.createElement("h5");
    title.className = "text-left font-semibold text-emerald-400 p-2 flex-3/4 ";
    title.innerText = category.strCategory;
    card.appendChild(title);
    card.appendChild(image);
    card.setAttribute("id", category.strCategory);
    card.setAttribute("onclick", "searchCategory(event)");
    catagoryCardContainer.appendChild(card);
  });
}
async function getCategoryData() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    if (response.ok) {
      result = await response.json();
      return result;
    } else {
      throw new Error("Error Fetching the data", response.status);
    }
  } catch (error) {
    console.error("Error Occured:" + error);
  }
}

async function searchData(data, type) {
  let response, result;
  if (type == "search") {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`
      );
      if (response.ok) {
        const data = await response.json();
        loadCards(data);
      } else {
        throw new Error("Error Fetching the data", response.status);
      }
    } catch (error) {
      console.error("Error occured:" + error);
      mainCardContainer.innerHTML = `<h4 class="text-center col-span-4 text-xl py-2 text-red-500 font-semibold m-4">Failed to load data. Please try again.</h4>`;
    }
  } else if (type == "category") {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data}`
      );
      if (response.ok) {
        const data = await response.json();
        loadCards(data);
      } else {
        throw new Error("Error Fetching the data", response.status);
      }
    } catch (error) {
      console.error("Error occured:" + error);
    }
  } else if (type == "recipe") {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`
      );
      if (response.ok) {
        const data = await response.json();
        loadRecipe(data.meals[0]);
      } else {
        throw new Error("Error Fetching the data", response.status);
      }
    } catch (error) {
      console.error("Error occured:" + error);
    }
  } else if (type == "random") {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      if (response.ok) {
        const data = await response.json();
        loadRecipe(data.meals[0]);
      } else {
        throw new Error("Error Fetching the data", response.status);
      }
    } catch (error) {
      console.error("Error occured:" + error);
    }
  }
}

function searchCategory(event) {
  searchData(
    event.target.id ? event.target.id : event.target.parentElement.id,
    "category"
  );
}

function updateRecipeCard(event) {
  searchData(
    event.target.id ? event.target.id : event.target.parentElement.id,
    "recipe"
  );
}
function loadRecipe(data) {
  recipeContainer.innerHTML = "";
  const card = document.createElement("div");
  const image = document.createElement("img");
  image.setAttribute("alt", `${data.strMeal} image`);
  image.setAttribute("src", data.strMealThumb);
  image.className = "m-4 rounded-2xl w-[30%] max-sm:w-[40%]";
  const title = document.createElement("h5");
  title.className = "text-center font-semibold text-3xl m-6 text-emerald-400";
  title.innerText = data.strMeal;
  const details = document.createElement("p");
  details.innerHTML = `Category:  ${data.strCategory}<br><br>Origin: ${data.strArea}`;
  details.className = "m-6  ";
  const instruction = document.createElement("p");
  instruction.innerHTML = `Instructions:<br> ${data.strInstructions}`;
  instruction.className = "p-2 bg-emerald-200";
  const youtubelink = document.createElement("a");
  youtubelink.innerHTML = `Video: ${
    data.strYoutube
      ? "Click here to watch a youtube tutorial!"
      : "No links Found"
  }`;
  youtubelink.setAttribute("href", data.strYoutube);
  youtubelink.className = "m-6";
  const container = document.createElement("div");
  container.className = "flex justify-between  rounded-xl";
  card.appendChild(title);
  card.appendChild(details);
  card.appendChild(youtubelink);
  container.appendChild(card);
  container.appendChild(image);
  recipeContainer.appendChild(container);
  recipeContainer.appendChild(instruction);
}

function addFavorite(event) {
  if (!localStorage.getItem("favoriteRecipe"))
    localStorage.setItem("favoriteRecipe", JSON.stringify([]));
  const recipeId = event.target.id;
  let favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipe"));
  if (!favoriteRecipes.includes(recipeId)) {
    favoriteRecipes.push(recipeId);
    localStorage.setItem("favoriteRecipe", JSON.stringify(favoriteRecipes));
    loadFavoritesCards();
  }

  event.stopPropagation();
}
async function fetchfavorite(recipeId) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.meals[0];
    } else {
      throw new Error("Error Fetching the data", response.status);
    }
  } catch (error) {
    console.log("Error Occured" + error);
  }
}
function loadFavoritesCards() {
  noFavoriteWarning.innerHTML = "";
  favoriteCard.innerHTML = "";
  const favoriteRecipes = JSON.parse(localStorage.getItem("favoriteRecipe"));
  if (favoriteRecipes.length !== 0) {
    favoriteRecipes.map(async (recipeId) => {
      const data = await fetchfavorite(recipeId);
      const card = document.createElement("div");
      card.setAttribute("id", data.idMeal);
      card.setAttribute("onclick", "updateRecipeCard(event)");
      const image = document.createElement("img");
      image.setAttribute("alt", `${data.strMeal} image`);
      image.setAttribute("src", data.strMealThumb);
      image.className = "p-2 rounded-2xl h-[75%]";
      const title = document.createElement("h4");
      title.className =
        "text-center font-semibold text-emerald-400 p-1 h-[10%]";
      title.innerText = data.strMeal;
      const dislike = document.createElement("button");
      dislike.id = data.idMeal;
      dislike.innerText = "❌";
      dislike.className = "text-sm bg-emerald-300 p-1 mx-2 rounded-2xl h-[10%]";
      dislike.setAttribute("onclick", "removeFavorite(event)");
      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(dislike);
      card.className =
        "col-span-1 rounded-xl justify-center items-center  bg-emerald-100 max-sm:col-span-2 ";
      favoriteCard.appendChild(card);
    });
  } else {
    noFavoriteWarning.innerHTML = `<h4 class="text-center text-2xl py-2 text-red-500 font-semibold m-4">No Favorites Yet!</h4>`;
  }
}
function removeFavorite(event) {
  const localdata = localStorage.getItem("favoriteRecipe");
  let arr = JSON.parse(localdata);
  arr.splice(arr.indexOf(event.target.id), 1);
  localStorage.setItem("favoriteRecipe", JSON.stringify(arr));
  loadFavoritesCards();
  event.stopPropagation();
}
