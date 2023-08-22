import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './styles.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api';
  
const refs = {
    breedSelect: document.querySelector(`.breed-select`),
    catInfo: document.querySelector(`.cat-info`),
    loader: document.querySelector(`.loader`), 
    error: document.querySelector(`.error`),
    
};

showLoader();
hideError();
hideSelect();

fetchBreeds().then((breeds) => {
    populateSelectWithBreeds(breeds); 
});

refs.breedSelect.addEventListener('change', showCardCat);
 
function populateSelectWithBreeds(breeds) {
   const optionsMarkup = breeds.map(({ id, name }, index) =>
    `<option value="${id}">${name}</option>`
   ).join('');

    refs.breedSelect.insertAdjacentHTML(`afterbegin`, optionsMarkup);
    
    hideLoader();

    new SlimSelect({
        select: refs.breedSelect
    }) 
    
    showSelect();
};

function showCardCat(event) {
        event.preventDefault();
        const selectedBreedId = event.target.value;
    
    showLoader();
    
    fetchCatByBreed(selectedBreedId).then((catData) => {
        hideLoader(); 
        hideError();

    refs.catInfo.innerHTML = `<img src="${catData[0].url}" alt="" />
      <div class="characteristics-cat">
        <h2>${catData[0].breeds[0].name}</h2>
        <p>${catData[0].breeds[0].description}</p>
        <p><span class="temp">Temperament: </span>${catData[0].breeds[0].temperament}</p>
      </div>`;
    }).catch((error) => {
      
        hideLoader();
        showError();
        
    console.error("Error fetching cat data:", error);
  });
};

function showLoader() {
    refs.catInfo.innerHTML = ``;
    refs.loader.style.display = 'block'; 
    
}

function hideLoader() {
  refs.loader.style.display = 'none'; 
}

function showError() {
  refs.error.classList.remove('hidden'); 
}

function hideError() {
  refs.error.classList.add('hidden'); 
  
}
 

function showSelect() {
  refs.breedSelect.classList.remove('hidden');
}

function hideSelect() {
  refs.breedSelect.classList.add('hidden'); 
}


// import './styles.css';
// import SlimSelect from 'slim-select';
// import '/node_modules/slim-select/dist/slimselect.css';
// import Notiflix from 'notiflix';

// import { fetchBreeds, fetchCatByBreed } from './cat-api';

// const refs = {
//     breedSelect: document.querySelector(`.breed-select`),
//     loader: document.querySelector(`.loader`),
//     error: document.querySelector(`.error`),
//     catInfo: document.querySelector(`.cat-info`),
// };
// function slim() {
//     new SlimSelect({
//         select: refs.select,
//         settings: {
//             showSearch: false,
//             searchText: 'Sorry nothing to see here',
//             searchPlaceholder: 'Search for the good stuff!',
//             searchHighlight: true,
//         },
//     });
// }


// refs.error.classList.add('hidden');
// refs.catInfo.classList.add('hidden');
// refs.select.classList.add('hidden');

// fetchBreeds()
//     .then(data => {
//         refs.select.innerHTML = createList(data);
//         slim();
//         refs.select.classList.remove('hidden');
//         refs.loader.classList.replace('loader', 'hidden');
//     })
//     .catch(onFetchError);

// refs.select.addEventListener('change', onSelectBreed);

// function onSelectBreed(event) {
//     refs.loader.classList.replace('hidden', 'loader');
//     refs.select.classList.add('hidden');
//     refs.catInfo.classList.add('hidden');
//     const breedId = event.currentTarget.value;

//     fetchCatByBreed(breedId)
//         .then(data => {
//             refs.loader.classList.replace('loader', 'hidden');
//             refs.select.classList.remove('hidden');
//             createMarkup(data);

//             refs.catInfo.classList.remove('hidden');
//         })
//         .catch(onFetchError);
// }

// function createList(arr) {
//     return arr
//         .map(({ id, name }) => `<option value="${id}">${name}</option>`)
//         .join('');
// }

// function createMarkup(data) {
//     const card = data
//         .map(el => {
//             return `<li><img src="${el.url}" alt="${el.breeds[0].name}" width="400"/><h2>${el.breeds[0].name}</h2><p>${el.breeds[0].description}</p><h3>Temperament</h3><p>${el.breeds[0].temperament}</p></li>`;
//         })
//         .join('');
//     refs.catInfo.innerHTML = card;
// }

// function onFetchError(error) {
//     refs.select.classList.remove('hidden');
//     refs.loader.classList.replace('loader', 'hidden');
//     console.log(error);
//     refs.catInfo.innerHTML = '';

//     Notiflix.Notify.failure(
//         'Oops! Something went wrong! Try reloading the page or select another cat breed!',
//         {
//             position: 'center-center',
//             timeout: 5000,
//             width: '400px',
//             fontSize: '24px',
//         }
//     );
// }

// // const { selector, divCatInfo, loader, error } = refs;

// // loader.classList.replace('loader', 'hidden');
// // error.classList.add('hidden');
// // divCatInfo.classList.add('hidden');

// // let arrBreedsId = [];
// // fetchBreeds()
// //     .then(arr => {
// //         arr.data.forEach(element => {
// //             arrBreedsId.push({ text: element.name, value: element.id });
// //         });
// //         const optionMarkup = arrBreedsId.map(({ value, text }) => {
// //             return `<option value="${value}">${text}</option>`;
// //         })
// //             .join(``);
// //         selector.innerHTML = optionMarkup;
// //         new SlimSelect({
// //             select: selector,
// //             arr: arrBreedsId,
// //         });
// //     })
// //     .catch(onFetchError);

// // selector.addEventListener('change', onSelectBreed);
// // function onSelectBreed(e) {
// //     loader.classList.replace('hidden', 'loader');
// //     selector.classList.add('hidden');
// //     divCatInfo.classList.add('hidden');

// //     const breedId = e.currentTarget.value;
// //     fetchCatByBreed(breedId)
// //         .then(data => {
// //             loader.classList.replace('loader', 'hidden');
// //             selector.classList.remove('hidden');
// //             const { url, breeds } = data.data[0];

// //             divCatInfo.innerHTML = `<div class="box-img"><img src="${URL}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`
// //             divCatInfo.classList.remove('hidden');
// //         })
// //         .catch(onFetchError);
// // }

// // function onFetchError(error) {
// //     selector.classList.remove('hidden');
// //     loader.classList.replace('loader', 'hidden');

// //     Notiflix.failure('Oops! Something went wrong! Try reloading the page!', {
// //         position: 'center-center',
// //         timeout: 5000,
// //         width: '400px',
// //         fontSize: '24px',
// //     });
// // };

// // function select() {
// //     new SlimSelect({
// //         select: selector,
// //     })
// // }

// // function createMarkup(arr) {
// //     return arr.data
// //         .map(({ id, name }) => {
// //             return `<option value="${id}">${name}</option>`;
// //         })
// //         .join(``);
// // }



// import { fetchBreeds } from "./cat-api";
// import { fetchCatByBreed } from "./cat-api";
