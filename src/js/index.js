import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select'

// new SlimSelect({
//   select: '#selectElement'
// })
import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_t1mW2wa0XY9KIPTcSL1wssfIiXpZYy71WPMPSiXAQZC4ztX2kccyRmhGDUPsGF9C";

const refs = {
    formSelect: document.getElementById("formSelect"),
    // list: document.getElementById("list"),
};

refs.formSelect.addEventListener("submit", catSelect);

function catSelect(e) {
    e.preventDefault();

    const breeds = refs.formSelect.elements.breeds;
    console.log(breeds.value);

    selectCat()
}

//  в <select> додати <option> = n

function selectCat(breeds) {
    const URL = "https://api.thecatapi.com/v1/images/search";
    const API_KEY = "live_t1mW2wa0XY9KIPTcSL1wssfIiXpZYy71WPMPSiXAQZC4ztX2kccyRmhGDUPsGF9C";

    const params = new URLSearchParams({
        key: API_KEY,
        // id:"ebv",
        // url: URL,
        width: 176, "height": 540,
        breeds,
        // favourite:{}
    });

    return fetch(`${URL}?${params}`).then(res => {
        console.log(res);
        if (!res.ok) {
            throw new Error("Помилка");
            // throw new Error(res.statusText);
        }
        return res.json();
    });
} 
    selectCat()
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
    