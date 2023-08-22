import axios from "axios";

const API_KEY = "live_VhtyYnkyxMgfx5Bi5E4pd702JpEuRLc28Ufpscydr16jp6skkL1koymAXPZMTipi";
const headers = {
  "x-api-key": API_KEY
};

export function fetchBreeds() {
  const BASE_URL = "https://api.thecatapi.com/v1/breeds";

  return axios.get(BASE_URL, { headers })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

export function fetchCatByBreed(breedId) {
  const SEARCH_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return axios.get(SEARCH_URL, { headers })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    })
    .catch(error => {
      throw new Error(error.message);
    });
}


// import axios from "axios";

// const API_KEY =
//     "live_t1mW2wa0XY9KIPTcSL1wssfIiXpZYy71WPMPSiXAQZC4ztX2kccyRmhGDUPsGF9C";
// axios.defaults.headers.common["x-api-key"] = API_KEY;
// // const API_KEY = 'https://api.thecatapi.com/v1/breeds';
// const URL = `https://api.thecatapi.com/v1`;

// function fetchBreeds() {
//     return axios
//         .get(`${URL}/breeds`).then(resp => {
//             return resp.data;
//         });
// }

// function fetchCatByBreed(breedId) {
//     const params = new URLSearchParams({
//         breed_ids: breedId,
//     });
//     return axios
//         .get(`${URL}/images/search?${params}`)
//         .then(resp => {
//             if (!resp.data.length) {
//                 throw new Error(resp.statusText);
//             }
//             return resp.data;
//         });
// }
// export { fetchBreeds, fetchCatByBreed };

// через аксиос