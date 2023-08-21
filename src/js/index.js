import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

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

function breedSelectId(breeds) {
    const optionMarkup = breeds.map(({ id, name }, index) =>
        `<option value="${id}">${name}</option>}`)
        .join('');
    
    refs.breedSelect.insertAdjacentHTML(`afterbegin`, optionMarkup);

    hideLoader();

    new SlimSelect({
    select: refs.breedSelect
    })

    showSelect();
};


function catSelect(e) {
    e.preventDefault();

    const selectBreed = e.target.value;
    // const { breeds } = e.currentTarget.elements;
    // console.log(breeds.value);
    // console.dir(refs.formSelect.breeds);
    showLoader();

    fetchCatByBreed(selectBreed)
        .then(data => {
            console.log(data);
            hideLoader();
            hideError();
            refs.catInfo.innerHTML = `<img src="${data[0].url}" alt="" />
         <div class="characteristics-cat">
        <h2>${catData[0].breeds[0].name}</h2>
        <p>${catData[0].breeds[0].description}</p>
        <p><span class="temp">Temperament: </span>${catData[0].breeds[0].temperament}</p>
      </div>`;
        })
        .catch((err) => {
            hideLoader();
            showError();
            console.error(err);
        });
    
};

function showLoader() {
    refs.catInfo.innerHTML = ``;
    refs.loader.computedStyleMap.display = 'block';
}

function hideLoader() {
    refs.loader.computedStyleMap.display = 'none';
}

function showError() {
    refs.error.classList.remove('hidden');
}

function hideError() {
    refs.error.classList.add('hidden');
}

function showSelect() {
    refs.selectField.classList.remove('hidden');
}

function hideSelect() {
    refs.selectField.classList.add('hidden');
}

//  в <select> додати <option> = n

// function catSelect(breeds) {
//     const URL = "https://api.thecatapi.com/v1/images/search";

//     const params = new URLSearchParams({
//         // key: API_KEY,
//         // id:"ebv",
//         url: URL,
//         // width: 176, "height": 540,
//         breeds,
//         // favourite:{}
//     });

//     return fetch(`${URL}?${params}`).then(res => {
//         console.log(res);
//         if (!res.ok) {
//             throw new Error("Помилка");
//             // throw new Error(res.statusText);
//         }
//         return res.json();
//     });
// } 
    // selectCat()
    // .then((data) => console.log(data))
    // .catch((err) => console.error(err));
    

    // new SlimSelect({
//   select: '#selectElement'
// })
