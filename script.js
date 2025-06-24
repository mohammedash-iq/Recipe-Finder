const searchInput = document.getElementById("searchinput");
const catagoryCardContainer = document.getElementById("catagoryCardContainer");
const mainCardContainer = document.getElementById("mainCardContainer");
loadCatogoryCards();
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
    const image = document.createElement("img");
    image.setAttribute("src", meal.strMealThumb);
    const title = document.createElement("h4");
    title.innerText = meal.strMeal;
    const disc = document.createElement("p");
    disc.innerText = meal.strInstructions ? meal.strInstructions : "";
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
async function loadCatogoryCards() {
  const data = await getCategoryData();
  data.categories.map((category) => {
    const card = document.createElement("div");
    const image = document.createElement("img");
    image.setAttribute("src", category.strCategoryThumb);
    const title = document.createElement("h5");
    title.innerText = category.strCategory;
    card.appendChild(title);
    card.appendChild(image);
    card.setAttribute("id", category.strCategory);
    card.setAttribute("onclick", "searchCategory(event)");
    catagoryCardContainer.appendChild(card);
    catagoryCardContainer.style.display = "flex";
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
  }
}

function searchCategory(event) {
  searchData(
    event.target.id ? event.target.id : event.target.parentElement.id,
    "category"
  );
}
