import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

// new SlimSelect({
//   select: '#selectElement'
// })

const refs = {
    breedSelect: document.getElementById(`.breed-select`),
    catInfo: document.querySelector(`.cat-info`),
    loader: document.querySelector(`.loader`),
    error: document.querySelector(`.error`),
};

showLoader();
hideError();
hideSelect();

fetchBreeds().then((breeds) => {
    breedSelectId(breeds);
});

refs.breedSelect.addEventListener("submit", catSelect);

function catSelect(e) {
    e.preventDefault();

    const breeds = refs.formSelect.elements.breeds;
    // const { breeds } = e.currentTarget.elements;
    // console.log(breeds.value);
    // console.dir(refs.formSelect.breeds);

    selectCat(breeds.value)
        .then(data => {
        console.log(data);
        })
    .catch((err) => console.error(err));
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
    // selectCat()
    // .then((data) => console.log(data))
    // .catch((err) => console.error(err));
    