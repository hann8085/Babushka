document.addEventListener("DOMContentLoaded", start);
const endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

let meals = [];
let filter = "alle";

const container = document.querySelector(".data_container");
const mealsTemplate = document.querySelector("template");



function start() {
    loadMealsDataData();
    addEventListenersToButtons();
}



async function loadMealsData() {
    const response = await fetch(endpoint);
    console.log(response);

    meals = await response.json();
    console.log(meals);


    visMeals();
}


function filtrering() {
    console.log("filter");



    filter = this.dataset.ret;

    document.querySelector("h1").textContent = this.textContent;

    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })
    this.classList.add("valgt");


    visMeals();
}


function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })
}




function visMeals() {
    container.innerHTML = "";
    meals.feed.entry.forEach((meal) => {

        if (filter == "alle" || filter == meal.gsx$sex.$t) {



            let klon = personerTemplate.cloneNode(true).content;

            klon.querySelector("img").src = meal.gsx$billede.$t;
            klon.querySelector("h3").textContent += meal.gsx$navn.$t;
            klon.querySelector(".pris").textContent += meal.gsx$pris.$t;
            klon.querySelector(".kort").textContent += meal.gsx$kort.$t;
            klon.querySelector(".lang").textContent += meal.gsx$lang.$t;
            klon.querySelector(".oprindelse").textContent += meal.gsx$oprindelse.$t;

            klon.querySelector(".kategori").textContent += meal.gsx$kategori.$t;



            container.appendChild(klon);


        }
    })

}
