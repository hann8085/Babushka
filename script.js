document.addEventListener("DOMContentLoaded", start);

const url = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";


const container = document.querySelector(".data_container");
const mealsTemplate = document.querySelector("template");
const detalje = document.querySelector("#detalje");

let meals = [];
let filter = "alle";


function start() {

    loadMealsData();
    addEventListenersToButtons();
}



async function loadMealsData() {
    const response = await fetch(url);
    console.log(response);

    meals = await response.json();
    console.log(meals);


    visMeals();
}


function filtrering() {
    console.log("filter");



    filter = this.dataset.kategori;

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

        if (filter == "alle" || filter == meal.gsx$kategori.$t) {



            let klon = mealsTemplate.cloneNode(true).content;

            //    Info der dukker op i hver meal kort
            klon.querySelector("img").src = "pics/small/" + meal.gsx$billede.$t + "-sm.jpg";
            klon.querySelector("h3").textContent += meal.gsx$navn.$t;
            klon.querySelector(".pris").textContent += meal.gsx$pris.$t + " kr";
            klon.querySelector(".kort").textContent += meal.gsx$kort.$t;



            klon.querySelector(".meals").addEventListener("click", () =>
                visDetalje(meal));

            container.appendChild(klon);


        }
    })

}

function visDetalje(meal) {
    console.log(meal.gsx$navn.$t);

    detalje.classList.remove("hide");

    detalje.querySelector(".popup_button").addEventListener("click", () =>
        detalje.classList.add("hide"));

    //    Info der dukker op i popup

    detalje.querySelector("h2").textContent = meal.gsx$navn.$t;

    detalje.querySelector("img").src = "pics/large/" + meal.gsx$billede.$t + ".jpg";
    detalje.querySelector("img").alt = "Billede af " + meal.gsx$navn.$t;
    detalje.querySelector(".lang").textContent = meal.gsx$lang.$t;
    detalje.querySelector(".oprindelse").textContent = meal.gsx$oprindelse.$t;
    detalje.querySelector(".pris_popup").textContent = meal.gsx$pris.$t + " kr";


}
