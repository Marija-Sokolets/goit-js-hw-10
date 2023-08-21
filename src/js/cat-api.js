import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_t1mW2wa0XY9KIPTcSL1wssfIiXpZYy71WPMPSiXAQZC4ztX2kccyRmhGDUPsGF9C";

function fetchBreeds() {
    return axios
        .get('https://api.thecatapi.com/v1/breeds');
}

function fetchCatByBreed(breedId) {
    return axios
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`);
}
export { fetchBreeds, fetchCatByBreed };