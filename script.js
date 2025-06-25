const searchInput = document.getElementById("searchinput");
const catagoryCardContainer = document.getElementById("catagoryCardContainer");
const mainCardContainer = document.getElementById("mainCardContainer");
const recipeContainer = document.getElementById("recipeContainer");
loadCatogoryCards();
searchData("", "random");
function searchRecipe() {
  if (!searchInput.value || searchInput.value.trim() == "") {
    console.log("type anything");
    searchInput.value = "";
    searchInput.focus();
  } else {
    const data = searchData(searchInput.value, "search");
  }
}
function loadCards(data) {
  mainCardContainer.innerHTML = "";
  data.meals.map((meal) => {
    const card = document.createElement("div");
    card.setAttribute("id", meal.idMeal);
    card.className = "bg-emerald-100 m-2 p-2 rounded-lg ";
    card.setAttribute("onclick", "updateRecipeCard(event)");
    const image = document.createElement("img");
    image.setAttribute("src", meal.strMealThumb);
    image.className = " p-3 rounded-2xl";
    const title = document.createElement("h4");
    title.className = "text-center font-semibold text-emerald-400 p-1 h-[20%]";
    title.innerText = meal.strMeal;
    const likebutton = document.createElement("button");
    likebutton.innerText = "❤ Add to Favorites";
    likebutton.className = "m-2 p-2 bg-emerald-200 block rounded-sm ";
    card.appendChild(image);
    card.appendChild(title);
    const container = document.createElement("div");
    container.className = "col-span-1 max-sm:col-span-2";
    container.appendChild(card);
    container.appendChild(likebutton);
    mainCardContainer.appendChild(container);
  });
}
async function loadCatogoryCards() {
  const data = await getCategoryData();
  data.categories.map((category) => {
    const card = document.createElement("div");
    card.className =
      "bg-emerald-100 m-1 flex rounded-md max-sm:col-span-6 max-lg:col-span-4 lg:col-span-2";
    const image = document.createElement("img");
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
  image.setAttribute("src", data.strMealThumb);
  image.className = "m-6 rounded-2xl w-[30%] max-sm:w-[40%]";
  const title = document.createElement("h5");
  title.className = "text-left font-semibold text-2xl m-6 text-emerald-400";
  title.innerText = data.strMeal;
  const details = document.createElement("p");
  details.innerHTML = `Category:  ${data.strCategory}<br><br>Origin: ${data.strArea}`;
  details.className = "m-6 ";
  const instruction = document.createElement("p");
  instruction.innerHTML = `Instructions:<br> ${data.strInstructions}`;
  instruction.className = "m-6 bg-emerald-200";
  const youtubelink = document.createElement("a");
  youtubelink.innerHTML = `Video: Click here to watch a youtube tutorial!`;
  youtubelink.setAttribute("href", data.strYoutube);
  youtubelink.className = "m-6";
  const container = document.createElement("div");
  container.className = "flex justify-between bg-emerald-200 rounded-xl";
  card.appendChild(title);
  card.appendChild(details);
  card.appendChild(youtubelink);
  container.appendChild(card);
  container.appendChild(image);
  recipeContainer.appendChild(container);
  recipeContainer.appendChild(instruction);
}
