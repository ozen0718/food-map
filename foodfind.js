document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const search = document.getElementById("search");
  const resultHeading = document.getElementById("result-heading");
  const meals = document.getElementById("meals");
  const randomBtn = document.getElementById("randomBtn");
  const singleMeal = document.getElementById("single-meal");

  // 검색기능

  function showMeal(e) {
    e.preventDefault();

    if (search.value.trim() !== "") {
      resultHeading.innerHTML = `<h2>${search.value}의 검색 결과 : </h2>`;
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.meals === null) {
            resultHeading.innerHTML =
              "<p>검색 결과가 없습니다. 다시 시도해주세요!</p>";
          } else {
            meals.innerHTML = `${data.meals
              .map(
                (meal) => `<div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="meal-info" data-mealID ="${meal.idMeal}">
                  <h3>${meal.strMeal}</h3>
              </div>
          </div>`
              )
              .join("")}`;
            console.log(data);
          }
        });
    } else {
      alert("키워드를 입력해주세요");
    }

    search.value = "";
  }

  //랜덤으로 음식 정보 띄어주기

  function showRandomMeal() {
    resultHeading.innerHTML = "";
    meals.innerHTML = "";

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
      .then((res) => res.json())
      .then((data) => {
        let strIngredient = [];

        for (let i = 1; i <= 20; i++) {
          if (data.meals[0][`strIngredient${i}`] !== "") {
            strIngredient.push(
              `${data.meals[0][`strIngredient${i}`]} - ${
                data.meals[0][`strMeasure${i}`]
              }`
            );
          } else {
            break;
          }
        }

        console.log(strIngredient);

        const dataMeals = data.meals[0];

        makeMealDiv(dataMeals, strIngredient);
      });
  }

  // 음식 정보, 이미지 띄어주기

  function makeMealDiv(dataMeals, strIngredient) {
    singleMeal.innerHTML = `<div class="single-meal">
                  <h1>${dataMeals.strMeal}</h1>
                  <img src="${dataMeals.strMealThumb}" alt="${
      dataMeals.strMeal
    }">
                  <div class="single-meal-info">
                      <p${dataMeals.strCategory}</p>
                      <p>${dataMeals.strArea}</p>
                  </div>
                  <div class="main">
                      <p>${dataMeals.strInstructions}</p>
                      <h2>조리법</h2>
                      <ul>${strIngredient
                        .map((item) => `<li>${item}</li>`)
                        .join("")}</ul>
   
                  </div>
   
              </div>`;
  }

  // 음식 id 가져오기

  function getMealID(e) {
    const mealInfo = e.composedPath().find((item) => {
      if (item.classList) {
        return item.classList.contains("meal-info");
      } else {
        return false;
      }
    });

    if (mealInfo) {
      const mealID = mealInfo.getAttribute("data-mealID");
      showMealDetail(mealID);
    }
  }

  function showMealDetail(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
      .then((res) => res.json())
      .then((data) => {
        let strIngredient = [];

        for (let i = 1; i <= 20; i++) {
          if (data.meals[0][`strIngredient${i}`] !== "") {
            strIngredient.push(
              `${data.meals[0][`strIngredient${i}`]} - ${
                data.meals[0][`strMeasure${i}`]
              }`
            );
          } else {
            break;
          }
        }

        const dataMeals = data.meals[0];

        makeMealDiv(dataMeals, strIngredient);
      });
  }

  form.addEventListener("submit", showMeal);
  randomBtn.addEventListener("click", showRandomMeal);
  meals.addEventListener("click", getMealID);
});
